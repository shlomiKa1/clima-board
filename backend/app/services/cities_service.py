import requests
from fastapi import HTTPException

def search(name: str):
    url = "https://geocoding-api.open-meteo.com/v1/search"
    params = {"name": name, "count": 10, "language": "en", "format": "json"}

    try:
        res = requests.get(url, params=params, timeout=5)
        res.raise_for_status()
    except requests.exceptions.RequestException:
        raise HTTPException(502, "City search service unavailable")

    data = res.json()
    return data.get("results", [])
