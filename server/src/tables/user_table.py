import sqlalchemy as sa

from .base import Base

class User(Base):
    __tablename__ = 'users'
    id = sa.Column(sa.Integer, primary_key=True)
    # email = sa.Column(sa.String, unique=True)
    username = sa.Column(sa.String, unique=True)
    password_hash = sa.Column(sa.String)