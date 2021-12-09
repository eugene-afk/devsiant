from fastapi import APIRouter   

from .projects import router as project_router
from .projects_items import router as project_items_router
from .auth import router as auth_router
from .files import router as files_router
from .buffer_socket import router as buffer_router
from .notes import router as notes_router
from .reports import router as reports_router

router = APIRouter()
router.include_router(project_router)
router.include_router(project_items_router)
router.include_router(auth_router)
router.include_router(files_router)
router.include_router(buffer_router)
router.include_router(notes_router)
router.include_router(reports_router)