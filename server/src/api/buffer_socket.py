from fastapi import APIRouter, Depends
from starlette.websockets import WebSocket, WebSocketDisconnect

from ..services.connection_service import ConnectionService
from ..models.auth_model import User
from ..services.auth_service import AuthService

router = APIRouter(
    prefix='/ws',
    tags=['Buffer socket'],
)

service = ConnectionService()

@router.websocket('/ws/{client_id}/{token}')
async def websocket_buffer(websocket: WebSocket, client_id: str, token: str, auth_service: AuthService = Depends()):
    user = auth_service.validate_token(token)
    if not user:
        return 
    await service.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await service.broadcast(data, websocket)
    except WebSocketDisconnect:
        service.disconnnect(websocket)