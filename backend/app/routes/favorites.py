from fastapi import APIRouter, Query, HTTPException
from services.favorites import get_all, add_weather_favorite, delete_weather
from schemas.favorite import FavoriteBody

router = APIRouter(tags=["Favorites"])

@router.get("/")
def all_favorites(explorerName: str = Query(..., min_length=2, max_length=100)) :
    favorites = get_all(explorerName)

    if not favorites:
        raise HTTPException(404, "רשימת המעודפים שלך ריקה")
    return favorites

@router.post("/")
def add_favorite(data: FavoriteBody):
    favorite = add_weather_favorite(data)

    if not favorite:
        raise HTTPException(409, "This is already in favorite")
    return {**favorite, "success": True}

@router.delete("/{weather_id}")
def remove_weather(weather_id: int):
    deleted = delete_weather(weather_id)

    if not deleted:
        raise HTTPException(404, "Weather not found")
    return {"message": ('Weather deleted %s successfully', weather_id), "success": True}

    