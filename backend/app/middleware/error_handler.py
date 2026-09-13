from fastapi import Request
from fastapi.responses import JSONResponse

async def error_handler(req: Request, err: Exception):
    print(f"Unhandled error on {req.url.path}: {err}")
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})