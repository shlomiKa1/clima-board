import requests
from fastapi import HTTPException

def get_weather(lat: float, lon: float):
    url = f"https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": "temperature_2m,weather_code,wind_speed_10m,apparent_temperature",
        "timezone": "auto",
    }

    try: 
        res = requests.get(url, params=params)
        res.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise HTTPException(502, "Weather service unavailable")

    return res.json()

def get_weather_days(lat: float, lon: float, days: int):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days={days}"
    res = requests.get(url)

    return res.json()
