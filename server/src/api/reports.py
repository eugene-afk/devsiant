from fastapi import APIRouter, Depends, status, File, UploadFile
from fastapi.exceptions import HTTPException
from fastapi.responses import StreamingResponse

from ..models.auth_model import User
from ..services.auth_service import get_current_user, AuthService
from ..services.reports_service import ReportsService

router = APIRouter(
    prefix='/reports',
    tags=['Export/Import'],
)

@router.post('/import/projects')
def import_projects_csv(file: UploadFile = File(...), user: User = Depends(get_current_user), service: ReportsService = Depends()):
    service.import_csv(file.file)

@router.get('/export/projects')
def export_projects_csv(token: str = '', service: ReportsService = Depends(), auth_service: AuthService = Depends()):
    user = auth_service.validate_token(token)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED) 
    report = service.export_csv()
    return StreamingResponse(report, media_type='text/csv', headers={
        'Content-Disposition': 'attachment; filename=report.csv'
    })

@router.post('/import/projectitems')
def import_project_items_csv(project_id: int, file: UploadFile = File(...), user: User = Depends(get_current_user), service: ReportsService = Depends()):
    service.import_csv(file.file, project_id)

@router.get('/export/projectitems')
def export_project_items_csv(project_id: int, token: str = '', service: ReportsService = Depends(), auth_service: AuthService = Depends()):
    user = auth_service.validate_token(token)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED) 
    report = service.export_csv_items(project_id)
    return StreamingResponse(report, media_type='text/csv', headers={
        'Content-Disposition': 'attachment; filename=report.csv'
    })