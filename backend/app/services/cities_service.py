import requests

def search(name: str):
    params = {"name": name, "count": 10, "language": "en", "format": "json"}
    url = "https://geocoding-api.open-meteo.com/v1/search"

    res = requests.get(url, params=params)

    if res.status_code != 200:
        raise RuntimeError(f"Error at Open-Meteo: {res.status_code}")

    data = res.json()

    return data.get("results", [])
