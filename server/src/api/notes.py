from typing import List
from fastapi import APIRouter, Depends, Response, status

from ..models.notes_model import Buffer, BufferUpdate, Note, NoteCreate, NoteUpdate
from ..models.auth_model import User
from ..services.notes_service import NotesService
from ..services.auth_service import get_current_user

router = APIRouter(
    prefix='/notes',
    tags=['Notes'],
)

@router.post('/buffer')
def save_buffer(data: BufferUpdate, service: NotesService = Depends(), user: User = Depends(get_current_user)):
    return service.update_buffer(data)

@router.get('/buffer',response_model=Buffer)
def get_last_saved_buffer(service: NotesService = Depends(), user: User = Depends(get_current_user)):
    return service.get_buffer()

@router.delete('/buffer')
def delete_last_buffer(service: NotesService = Depends(), user: User = Depends(get_current_user)):
    service.delete_buffer()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.get('/', response_model=List[Note])
def get_notes_list(service: NotesService = Depends(), user: User = Depends(get_current_user)):
    return service.get_list()

@router.put('/{note_id}', response_model=Note)
def update_note(data: NoteUpdate, note_id: int, service: NotesService = Depends(), user: User = Depends(get_current_user)):
    return service.update_note(note_id, data)

@router.post('/', response_model=Note)
def create_note(data: NoteCreate, service: NotesService = Depends(), user: User = Depends(get_current_user)):
    return service.create_note(data)

@router.delete('/{note_id}')
def delete_note(note_id: int, service: NotesService = Depends(), user: User = Depends(get_current_user)):
    service.delete_note(note_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
