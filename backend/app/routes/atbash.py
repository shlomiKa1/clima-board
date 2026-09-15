from fastapi import APIRouter
from services.atbash import atbash
from schemas.atbash import Atbash

router = APIRouter(tags=["Atbash"])

@router.post("/")
def create_atbash(text: Atbash):
    return atbash(text.model_dump()["name"])