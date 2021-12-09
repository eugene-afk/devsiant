import os
from fastapi.param_functions import Depends
from passlib.hash import bcrypt
from jose import jwt, JWTError
from fastapi import HTTPException, status
from pydantic import ValidationError
from datetime import datetime, timedelta
from sqlalchemy.orm.session import Session
from fastapi.security import OAuth2PasswordBearer

from ..database import get_session
from ..models import auth_model as models
from ..tables.user_table import User as usr_table
from ..settings import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/sign-in/')
def get_current_user(token: str = Depends(oauth2_scheme)) -> models.User:
    return AuthService.validate_token(token)

class AuthService:
    @classmethod
    def verify_password(cls, plain_password: str, hashed_password: str) -> bool:
        return bcrypt.verify(plain_password, hashed_password)

    @classmethod
    def hash_password(cls, password: str) -> str:
        return bcrypt.hash(password)

    @classmethod
    def validate_token(cls, token: str) -> models.User:
        exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Could not validate credentials',
            headers={
                'WWW-Authenticate': 'Bearer'
            }
        )

        try:
            payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        except JWTError:
            raise exception from None
        
        user_data = payload.get('user')
        try:
            user = models.User.parse_obj(user_data)
        except ValidationError:
            raise exception from None

        return user

    @classmethod
    def create_token(cls, user: usr_table) -> models.Token:
        user_data = models.User.from_orm(user)

        now = datetime.utcnow()
        payload = {
            'iat': now,
            'nbf': now,
            'exp': now + timedelta(seconds=settings.jwt_expiration),
            'sub': str(user_data.id),
            'user': user_data.dict()
        }
        token = jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)
        return models.Token(access_token=token)

    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def register_new_user(self, user_data: models.UserCreate) -> models.Token:
        user = usr_table(
            # email=user_data.email,
            username=user_data.username,
            password_hash=self.hash_password(user_data.password)
        )

        self.session.add(user)
        self.session.commit()

        return self.create_token(user)

    def check_core_user(self) -> bool:
        user = (
            self.session
            .query(usr_table)
            .first()
        )
        if not user:
            return False
        return True

    def authenticate_user(self, username: str, password: str) -> models.Token:
        exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect username or password',
            headers={
                'WWW-Authenticate': 'Bearer'
            }
        )
        if not self.check_core_user():
            self.try_create_admin()
        user = (
            self.session
            .query(usr_table)
            .filter(usr_table.username == username)
            .first()
        )
        if user:
            if not self.verify_password(password, user.password_hash):
                raise exception from None
            return self.create_token(user)
            
        raise exception from None

    def try_create_admin(self):
        new_user = models.UserCreate(
            username = settings.admin_name,
            password = settings.admin_pass
        )
        self.register_new_user(new_user)

    