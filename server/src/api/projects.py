from fastapi import APIRouter, Depends, Response, status
from typing import List

from ..models.project_model import Project, ProjectCreate, ProjectUpdate, ProjectWithItems
from ..models.auth_model import User
from ..services.projects_service import ProjectsService
from ..services.auth_service import get_current_user

router = APIRouter(
    prefix='/projects',
    tags=['Projects'],
)

@router.get('/', response_model=List[Project])
def get_projects(service: ProjectsService = Depends(), user: User = Depends(get_current_user)):
    return service.get_list()

@router.post('/', response_model=Project)
def create_project(project_data: ProjectCreate, service: ProjectsService = Depends(), user: User = Depends(get_current_user)):
    return service.create(project_data=project_data)

@router.get('/withitems', response_model=List[ProjectWithItems])
def get_full_projects(service: ProjectsService = Depends(), user: User = Depends(get_current_user)):
    return service.get_list()

@router.get('/{project_id}', response_model=Project)
def get_project(project_id: int, service: ProjectsService = Depends(), user: User = Depends(get_current_user)):
    return service.get(project_id=project_id)

@router.get('/withitems/{project_id}', response_model=ProjectWithItems)
def get_project_with_items(project_id: int, service: ProjectsService = Depends(), user: User = Depends(get_current_user)):
    return service.get(project_id=project_id)

@router.put('/{project_id}', response_model=Project)
def update_project(project_id: int, project_data: ProjectUpdate, service: ProjectsService = Depends(), user: User = Depends(get_current_user)):
    return service.update(project_id=project_id, project_data=project_data)

@router.delete('/{project_id}')
def delete_project(project_id: int, service: ProjectsService = Depends(), user: User = Depends(get_current_user)):
    service.delete(project_id=project_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.put('/favorite/{project_id}', response_model=Project)
def set_favorite(project_id: int, service: ProjectsService = Depends(), user: User = Depends(get_current_user)):
    return service.favorite(project_id)

@router.get('/name/{project_id}')
def get_project_name(project_id: int, service: ProjectsService = Depends(), user: User = Depends(get_current_user)):
    return service.project_name(project_id)
