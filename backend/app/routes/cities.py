from fastapi import APIRouter, HTTPException, Query
from services.cities_service import search

router = APIRouter(tags=["city"])

@router.get("/search")
def search_city(name: str = Query(..., min_length=2, max_length=50 )):
    try:
        result = search(name)
        return result
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"fail {e}")

