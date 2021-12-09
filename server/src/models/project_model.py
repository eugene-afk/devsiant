from pydantic import BaseModel
from datetime import date
from typing import Optional, List

class ProjectBase(BaseModel):
    date: date
    name: str
    desc: Optional[str]
    favorite: bool

class Project(ProjectBase):
    id: int

    class Config:
        orm_mode = True

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    pass

class ProjectItemBase(BaseModel):
    name: str
    login: str
    password: str
    desc: Optional[str]

    class Config:
        orm_mode = True

class ProjectItem(ProjectItemBase):
    id: int
    project_parent_id: int
    # owner: Project = None

    class Config:
        orm_mode: True


class ProjectItemCreate(ProjectItemBase):
    project_parent_id: int

class ProjectItemUpdate(ProjectItemBase):
    pass

class ProjectItemWithOwner(ProjectItemBase):
    id: int
    project_parent_id: int
    owner: Project

    class Config:
        orm_mode = True

class ProjectWithItems(ProjectBase):
    id: int
    items: List[ProjectItem] = []

    class Config:
        orm_mode = True

