from pydantic import BaseModel
from datetime import datetime

class NoteBase(BaseModel):
    name: str
    content: str

class Note(NoteBase):
    date: datetime
    id: int

    class Config:
        orm_mode = True

class NoteCreate(NoteBase):
    pass

class NoteUpdate(NoteBase):
    pass

class BufferBase(BaseModel):
    date: datetime
    content: str

class Buffer(BufferBase):
    id: int

    class Config:
        orm_mode = True

class BufferUpdate(BaseModel):
    content: str

    class Config:
        orm_mode=True

