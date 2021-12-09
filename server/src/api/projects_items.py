from fastapi import APIRouter, Depends, Response, status
from typing import List

from ..models.project_model import ProjectItem, ProjectItemCreate, ProjectItemUpdate, ProjectItemWithOwner
from ..models.auth_model import User
from ..services.projects_items_service import ProjectsItemsService
from ..services.auth_service import get_current_user

router = APIRouter(
    prefix='/projectitems',
    tags=['Accounts'],
)

@router.get('/{project_id}', response_model=List[ProjectItem])
def get_items_by_project_id(project_id: int, service: ProjectsItemsService = Depends(), user: User = Depends(get_current_user)):
    return service.get_list(project_id=project_id)

@router.post('/', response_model=ProjectItem)
def create_project_item(item_data: ProjectItemCreate, service: ProjectsItemsService = Depends(), user: User = Depends(get_current_user)):
    return service.create(item_data=item_data)

@router.get('/withowner/{project_id}', response_model=List[ProjectItemWithOwner])
def get_full_project_items(project_id: int, service: ProjectsItemsService = Depends(), user: User = Depends(get_current_user)):
    return service.get_list(project_id=project_id)

@router.get('/item/{item_id}', response_model=ProjectItem)
def get_project_item(item_id: int, service: ProjectsItemsService = Depends(), user: User = Depends(get_current_user)):
    return service.get(item_id=item_id)

@router.get('/item/withowner/{item_id}', response_model=ProjectItemWithOwner)
def get_project_item_with_owner(item_id: int, service: ProjectsItemsService = Depends(), user: User = Depends(get_current_user)):
    return service.get(item_id=item_id)

@router.put('/{item_id}', response_model=ProjectItem)
def update_project_item(item_id: int, item_data: ProjectItemUpdate, service: ProjectsItemsService = Depends(), user: User = Depends(get_current_user)):
    return service.update(item_id=item_id, item_data=item_data)

@router.delete('/{item_id}')
def delete_project_item(item_id: int, service: ProjectsItemsService = Depends(), user: User = Depends(get_current_user)):
    service.delete(item_id=item_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

