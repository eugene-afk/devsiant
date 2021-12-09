import os, math
from ..tools.unseekable_stream import UnseekableStream
from typing import List
import shutil
from fastapi.datastructures import UploadFile
from fastapi import HTTPException, status
from ..settings import settings
from fastapi.encoders import jsonable_encoder
from starlette.responses import Response, StreamingResponse
# from fastapi.responses import FileResponse
from os.path import abspath, exists, getsize
import zipfile
from io import BytesIO
from psutil import virtual_memory
from ..tools.file_response import FileResponse

from ..models.files_model import FileDelete, FileRename

class FilesService:
    def __init__(self):
        self.root_path = settings.root_path

    def get_directories_with_files(self, directory_path: str):
        root_dir = "static"
        path = self.root_path
        if directory_path:
            path = f"{path}/{directory_path}"
            root_dir = directory_path.rsplit('/', 1)[-1]
        res = self._path_to_dict(path)
        res[root_dir]["files"] = self._path_to_files_dict(path)
        return jsonable_encoder(res)

    def get_directory_childs(self, directory_path: str):
        path = self.root_path
        if directory_path:
            path = f"{path}/{directory_path}"
        return jsonable_encoder(self._path_to_dict(path))

    def get_directory_files(self, directory_path: str):
        path = self.root_path
        if directory_path:
            path = f"{path}/{directory_path}"
        return jsonable_encoder(self._path_to_files_dict(path))

    async def upload(self, path: str, files: List[UploadFile]):
        res = {}
        for i in files:
            bad_chars = ['!', '@', '#', "$", "%", "^", "&", "`", "'"]
            normalize_filename = ''.join(i for i in i.filename if not i in bad_chars)

            file_path = f"{self.root_path}/{path + '/' if path else ''}{str(normalize_filename)}"
            try:
                with open(file_path, "wb") as buffer:
                    shutil.copyfileobj(i.file, buffer)
                res[str(normalize_filename)] = "success"
            except:
                res[str(normalize_filename)] = "failed"

        yield str(res)

    def download(self, path: str, filename: str):
        abs_path = abspath(f"src/static/{path}")
        if not filename or not exists(abs_path):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        file = open(f"{self.root_path}/{path}/{filename}", mode="rb")
        size = getsize(f"{self.root_path}/{path}/{filename}")
        mem = virtual_memory().total - virtual_memory().available
        if size > mem:
            return FileResponse(f"{abs_path}/{filename}", filename=filename)

        return Response(content=file.read(), headers={
            'Content-Disposition': f"attachment;filename={filename}"
        })

    def zipfiles(self, files: List[str], path: str):
        size = 0
        for i in files:
            abs_path = abspath(f"src/static/{path}/{i}")
            size += os.path.getsize(abs_path)

        if size > settings.max_file_size_bytes:
            return {'message': f"Too large files size. Max is {self.convert_size(settings.max_file_size_bytes)}"}
        zip_subdir = "archive"
        zip_filename = f"{zip_subdir}.zip"
        stream = UnseekableStream()

        with open(zip_filename, "wb") as zf:
            # for filename in files:
            # zip_path = os.path.join(zip_subdir, filename)
            # abs_path = abspath(f"src/static/{path}/{filename}")
            for i in self.zipfile_generator(path, stream, zip_subdir, files):
                zf.write(i)

        zf.close()
        stream.close()

        # resp = Response(zip_filename, media_type="application/x-zip-compressed", headers={
        #     'Content-Disposition': f"attachment;filename={zip_filename}"
        # })
        resp = FileResponse(abspath(zip_filename), filename=zip_filename, del_after_download=True)
        return resp


    def zipfile_generator(self, path, stream, zip_path, files):
        with zipfile.ZipFile(stream,"w") as zf:
            # z_info = zipfile.ZipInfo.from_file(path)
            for file in files:
                abs_path = abspath(f"src/static/{path}/{file}")
                with open(abs_path, 'rb') as entry, zf.open(os.path.join(zip_path, file), mode="w") as dest:
                    for chunk in iter(lambda: entry.read(settings.chunk_size_bytes), b''):
                        dest.write(chunk)
                        yield stream.get()
        yield stream.get()

    def rename(self, data: FileRename) -> FileRename:
        new_path = data.path.replace(data.old_name, data.new_name)
        old_abs_path = abspath(f"src/static/{data.path}")
        new_abs_path = abspath(f"src/static/{new_path}")
        if not exists(old_abs_path):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        try:
            os.rename(old_abs_path, new_abs_path)
            data.path = new_path
            return data
        except Exception:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, data: FileDelete) -> FileDelete:
        abs_path = abspath(f"src/static/{data.path}")
        if not exists(abs_path):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        if not data.is_file:
            shutil.rmtree(abs_path)
            return data
        os.remove(abs_path)
        return data

    def create_folder(self, path: str, name: str):
        f_path = f"{path}/{name}" if path else f"{name}"
        abs_path = abspath(f"src/static/{f_path}")
        if not name or exists(abs_path):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
        try:
            os.makedirs(abs_path)
        except Exception:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return {name: 'success'}
        

    @classmethod
    def _path_to_dict(self, path: str):
        d = {os.path.basename(path): {}}
        if not os.path.isdir(path):
            return
        d[os.path.basename(path)]['type'] = "directory"
        d[os.path.basename(path)]['children'] = [name for name in os.listdir(path) if os.path.isdir(os.path.join(path, name))]
        #d[os.path.basename(path)]['children'] = [path_to_dict(os.path.join(path,x)) for x in os.listdir(path)] !!to get full directory tree
        return d

    @classmethod
    def _path_to_files_dict(self, path: str):
        files_list = []
        for root, dirs, files in os.walk(path):
            files_list.extend(files)
            break
        return files_list
        
    @classmethod
    def convert_size(self, size_bytes):
        if size_bytes == 0:
            return "0B"
        size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
        i = int(math.floor(math.log(size_bytes, 1024)))
        p = math.pow(1024, i)
        s = round(size_bytes / p, 2)
        return "%s %s" % (s, size_name[i])