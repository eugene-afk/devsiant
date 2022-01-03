from pydantic import BaseSettings
import os

class Settings(BaseSettings):
    server_host: str = '0.0.0.0'
    server_port: int = 5000
    database_url: str = "sqlite:///db/db.sqlite3"
    jwt_secret: str
    jwt_algorithm: str = 'HS256'
    jwt_expiration: int = 604800
    root_path: str = "./src/media"
    max_file_size_bytes = int(os.getenv('MAX_FILE_SIZE')) if os.getenv('MAX_FILE_SIZE') else 3221225472
    chunk_size_bytes = int(os.getenv('CHUNK_SIZE')) if os.getenv('CHUNK_SIZE') else 20480
    admin_name = os.getenv('ADM_USER') if os.getenv('ADM_USER') else "admin"
    admin_pass = os.getenv('ADM_PASSWORD') if os.getenv('ADM_PASSWORD') else "admin"

settings = Settings(
    _env_file = '.env',
    _env_file_encoding='utf-8'
)