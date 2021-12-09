from typing import List, Optional
from fastapi import APIRouter, Depends, File, UploadFile, Query, status
from fastapi.exceptions import HTTPException
from fastapi.responses import StreamingResponse
from http import HTTPStatus

from ..services.files_service import FilesService
from ..models.files_model import FileDelete, FileRename
from ..models.auth_model import User
from ..services.auth_service import get_current_user, AuthService

router = APIRouter(
    prefix='/files',
    tags=['Files'],
)

@router.get('/')
def get_directories_with_files(directory_path: Optional[str] = '', service: FilesService = Depends(), user: User = Depends(get_current_user)):
    return service.get_directories_with_files(directory_path)

@router.get('/dirfiles')
def get_files_by_directory_name(directory_path: Optional[str] = '', service: FilesService = Depends(), user: User = Depends(get_current_user)):
    return service.get_directory_files(directory_path)

@router.get('/dirs')
def get_directory_tree(directory_path: Optional[str] = '', service: FilesService = Depends(), user: User = Depends(get_current_user)):
    return service.get_directory_childs(directory_path)

@router.post('/upload', status_code=HTTPStatus.ACCEPTED)
async def upload_files(path: Optional[str] = '', files: List[UploadFile] = File(...), service: FilesService = Depends(), user: User = Depends(get_current_user)):
    return StreamingResponse(service.upload(path, files))

@router.get('/download')
def download_file(path: str = '', filename: str = '', token: str = '', service: FilesService = Depends(), auth_service: AuthService = Depends()):
    user = auth_service.validate_token(token)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED) 
    return service.download(path, filename)

@router.get('/download/multiple')
def download_files(path: str = '', token: str='', f: List[str] = Query(None), service: FilesService = Depends(), auth_service: AuthService = Depends()):
    user = auth_service.validate_token(token)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED) 
    return service.zipfiles(f, path)

@router.post('/rename', response_model = FileRename)
def rename_file(data: FileRename, service: FilesService = Depends(), user: User = Depends(get_current_user)):
    return service.rename(data)

@router.post('/delete', response_model=FileDelete)
def delete_file(data: FileDelete, service: FilesService = Depends(), user: User = Depends(get_current_user)):
    return service.delete(data)

@router.post('/folder')
def create_new_folder(name: str = '', path: str = '', service: FilesService = Depends(), user: User = Depends(get_current_user)):
    return service.create_folder(path, name)