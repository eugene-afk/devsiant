from typing import List
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime

from ..tables.notes_table import Note as note_table
from ..tables.notes_table import Buffer as buffer_table
from ..database import get_session
from ..models.notes_model import NoteCreate, NoteUpdate, BufferUpdate

class NotesService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def _get_note(self, note_id):
        note = (
            self.session
            .query(note_table)
            .filter_by(id=note_id)
            .first()
        )
        if not note:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return note

    def _get_buffer(self):
        buffer = (
            self.session
            .query(buffer_table)
            .first()
        )
        return buffer

    def update_buffer(self, data: BufferUpdate):
        if not data.content:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
        buffer = self._get_buffer()
        if not buffer:
            buffer = buffer_table()
            buffer.date = datetime.utcnow()
            buffer.content = ""
            self.session.add(buffer)
        buffer.content = data.content
        self.session.commit()
        return {'date': buffer.date}

    def get_buffer(self) -> buffer_table:
        buffer = self._get_buffer()
        if not buffer:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        return buffer

    def delete_buffer(self):
        buffer = self._get_buffer()
        if not buffer:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        self.session.delete(buffer)
        self.session.commit()
        
    def get_list(self) -> List[note_table]:
        notes = (
            self.session
            .query(note_table)
            .order_by(note_table.date.desc())
            .all()
        )
        return notes

    def create_note(self, data: NoteCreate) -> note_table:
        note = note_table(**data.dict())
        note.date = datetime.utcnow()
        self.session.add(note)
        self.session.commit()
        return note

    def update_note(self, note_id: int, data: NoteUpdate) -> note_table:
        note = self._get_note(note_id)
        for field, value in data:
            setattr(note, field, value)
        self.session.commit()
        return note

    def delete_note(self, note_id: int):
        note = self._get_note(note_id)
        self.session.delete(note)
        self.session.commit()

