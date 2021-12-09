from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..tables.project_table import Project as proj_table
from ..database import get_session
from ..models.project_model import ProjectCreate, ProjectUpdate

class ProjectsService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session
    
    def _get(self, project_id: int) -> proj_table:
        project = (
            self.session
            .query(proj_table)
            .filter_by(id=project_id)
            .first()
        )
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return project

    def get_list(self) -> List[proj_table]:
        projects = (
            self.session
            .query(proj_table)
            .order_by(proj_table.date.desc(), proj_table.favorite.desc())
            .all()
        )
        return projects

    def create(self, project_data: ProjectCreate) -> proj_table:
        project = proj_table(**project_data.dict())
        self.session.add(project)
        self.session.commit()
        return project

    def create_many(self, data: List[ProjectCreate]) -> List[proj_table]:
        projects = [
            proj_table(**i.dict())
            for i in data
        ]

        self.session.add_all(projects)
        self.session.commit()
        return projects

    def get(self, project_id: int) -> proj_table:
        return self._get(project_id)

    def update(self, project_id: int, project_data: ProjectUpdate) -> proj_table:
        project = self._get(project_id)
        for field, value in project_data:
            setattr(project, field, value)
        self.session.commit()
        return project

    def delete(self, project_id: int):
        project = self._get(project_id)
        self.session.delete(project)
        self.session.commit()

    def favorite(self, project_id: int):
        project = self._get(project_id)
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        if not project.favorite:
            project.favorite = True
        else:
            project.favorite = False
        self.session.commit()
        return project

    def project_name(self, project_id: int):
        project = self._get(project_id)
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return {'name': project.name}


