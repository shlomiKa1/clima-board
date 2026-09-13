from fastapi import APIRouter, Query
from services.weather_service import get_weather , get_weather_days

router = APIRouter(tags=["Weather"])

@router.get("/current")
def currentWeather(lat: float = Query(ge=-90, le=90), lon: float = Query(ge=-180, le=180)) -> dict:
    return get_weather(lat, lon)

@router.get("/forecast")
def forecastWeather(lat: float = Query(ge=-90, le=90), lon: float = Query(ge=-180, le=180), days: int = Query(ge=1, le=16)):
    data = get_weather_days(lat, lon, days)
    return data

@router.get("/compare")
def compareTwoCities(lat_a: float = Query(ge=-90, le=90), lon_a: float = Query(ge=-180, le=180), lat_b: float = Query(ge=-90, le=90), lon_b: float = Query(ge=-180, le=180)):
    city_a = get_weather(lat_a, lon_a)
    city_b = get_weather(lat_b, lon_b)

    return {"city_a": city_a, "city_b": city_b}
