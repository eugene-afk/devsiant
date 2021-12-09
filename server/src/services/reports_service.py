import csv
from fastapi import Depends
from io import StringIO

from ..services.projects_service import ProjectsService
from ..services.projects_items_service import ProjectsItemsService
from ..models.project_model import Project, ProjectCreate, ProjectItemCreate, ProjectItem

class ReportsService:
    def __init__(self, projects_service: ProjectsService = Depends(), projects_items_service: ProjectsItemsService = Depends()): 
        self.proj_service = projects_service
        self.items_service = projects_items_service

    def import_csv(self, file):
        reader = csv.DictReader(
            (line.decode() for line in file),
            fieldnames=[
                'date',
                'name',
                'desc',
                'favorite'
            ]
        )

        projects = []
        next(reader)
        for row in reader:
            project_data = ProjectCreate.parse_obj(row)
            projects.append(project_data)

        self.proj_service.create_many(projects)
    
    def export_csv(self):
        output = StringIO()
        writer = csv.DictWriter(
            output,
                        fieldnames=[
                'date',
                'name',
                'desc',
                'favorite'
            ],
            extrasaction='ignore'
        )

        projects = self.proj_service.get_list()
        writer.writeheader()
        for i in projects:
            project_data = Project.from_orm(i)
            writer.writerow(project_data.dict())

        output.seek(0)
        return output

    def import_csv_items(self, file, id):
        reader = csv.DictReader(
            (line.decode() for line in file),
            fieldnames=[
                'name',
                'login',
                'password',
                'desc',
                'project_parent_id',
            ]
        )

        items = []
        next(reader)
        for row in reader:
            item_data = ProjectItemCreate.parse_obj(row)
            items.append(item_data)

        self.items_service.create_many(items, id)
    
    def export_csv_items(self, id:int):
        output = StringIO()
        writer = csv.DictWriter(
            output,
            fieldnames=[
                'name',
                'login',
                'password',
                'desc',
                'project_parent_id',
            ],
            extrasaction='ignore'
        )

        items = self.items_service.get_list(id)
        writer.writeheader()
        for i in items:
            item_data = ProjectItem.from_orm(i)
            writer.writerow(item_data.dict())

        output.seek(0)
        return output
