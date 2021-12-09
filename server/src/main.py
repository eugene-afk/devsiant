from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from os.path import join, dirname, realpath
from fastapi.middleware.cors import CORSMiddleware
import os

from .api import router
from .database import engine
from .tables.base import Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title='Devsiant',
)

os.environ["TMPDIR"] = os.getcwd()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(router)
app.mount("/static", StaticFiles(directory=join(dirname(realpath(__file__)), "static")), name="static")
