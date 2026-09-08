import requests
from ..config import BASE_URL
from urllib.parse import urlencode

def search(name: str, limit: int = 1) -> dict | None:
    params = urlencode({"name": name, "count": limit, "language": "en", "format": "json"})
    url = f"{BASE_URL}/search?{params}"

    try:
        res = requests.get(url, timeout=5)
    except requests.exceptions.Timeout:
        raise TimeoutError("asdg")

    if res.status_code != 200:
        raise RuntimeError(f"Error at Open-Meteo: {res.status_code}")

    data = res.json()
    return data
