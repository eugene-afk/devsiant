import sqlalchemy as sa

from .base import Base

class Note(Base):
    __tablename__ = 'notes'
    id = sa.Column(sa.Integer, primary_key=True, index=True)
    date = sa.Column(sa.DateTime)
    name = sa.Column(sa.String, index=True)
    content = sa.Column(sa.Text)

class Buffer(Base):
    __tablename__ = 'buffer'
    id = sa.Column(sa.Integer, primary_key=True, index=True)
    date = sa.Column(sa.DateTime)
    content = sa.Column(sa.Text)