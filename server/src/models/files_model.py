from pydantic import BaseModel

class ModifyBase(BaseModel):
    path: str
    is_file: bool

class FileRename(ModifyBase):
    old_name: str
    new_name: str

class FileDelete(ModifyBase):
    name: str
    
