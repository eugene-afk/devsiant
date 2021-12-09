import sqlalchemy as sa
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.orm import relationship

from .base import Base

class Project(Base):
    __tablename__ = 'projects'
    id = sa.Column(sa.Integer, primary_key=True, index=True)
    date = sa.Column(sa.Date)
    name = sa.Column(sa.String, unique=True, index=True)
    desc = sa.Column(sa.String)
    favorite = sa.Column(sa.Boolean, default=False)
    items = relationship("ProjectItem", back_populates="owner")

class ProjectItem(Base):
    __tablename__ = 'project_items'
    id = sa.Column(sa.Integer, primary_key=True, index=True)
    name = sa.Column(sa.String, index=True)
    login = sa.Column(sa.String)
    password = sa.Column(sa.String)
    desc = sa.Column(sa.String)
    project_parent_id = sa.Column(sa.Integer, ForeignKey("projects.id"))
    owner = relationship("Project", back_populates="items")
