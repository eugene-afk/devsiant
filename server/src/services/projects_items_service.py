from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..tables.project_table import ProjectItem as item_table
from ..database import get_session
from ..models.project_model import ProjectItemCreate, ProjectItemUpdate

class ProjectsItemsService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session
    
    def _get(self, item_id: int) -> item_table:
        item = (
            self.session
            .query(item_table)
            .filter_by(id=item_id)
            .first()
        )
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return item

    def get_list(self, project_id: int) -> List[item_table]:
        projects = (
            self.session
            .query(item_table)
            .filter_by(project_parent_id=project_id)
            .all()
        )
        return projects

    def create(self, item_data: ProjectItemCreate) -> item_table:
        item = item_table(**item_data.dict())
        self.session.add(item)
        self.session.commit()
        return item

    def create_many(self, data: List[ProjectItemCreate], id: int) -> List[item_table]:
        items = [
            item_table(**i.dict())
            for i in data
        ]

        for i in items:
            i.project_parent_id = id

        self.session.add_all(items)
        self.session.commit()
        return items

    def get(self, item_id: int) -> item_table:
        return self._get(item_id)

    def update(self, item_id: int, item_data: ProjectItemUpdate) -> item_table:
        item = self._get(item_id)
        for field, value in item_data:
            setattr(item, field, value)
        self.session.commit()
        return item

    def delete(self, item_id: int):
        item = self._get(item_id)
        self.session.delete(item)
        self.session.commit()
