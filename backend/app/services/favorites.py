from data import loadFile, saveData
from schemas.favorite import FavoriteBody

def get_all(explorerName: str):
    data = loadFile();
    favorites=[]

    for weater in data:
        if weater["explorerName"] == explorerName:
            favorites.append(weater);
    return favorites

def add_weather_favorite(new_weather: FavoriteBody):
    data = loadFile()

    for weather in data:
        if (exists_weather(weather, new_weather)):
            return None

    new_id = max([item["id"] for item in data]) + 1 if len(data) > 0 else 1
    new_weather = {"id": new_id, **new_weather.model_dump()}
    data.append(new_weather)
    saveData(data)
    return new_weather

def delete_weather(weather_id):
    data = loadFile()
    old_len = len(data)

    data = [w for w in data if w["id"] != weather_id]

    if old_len == len(data):
        return False

    saveData(data)
    return True

def exists_weather(weather: dict, new_weather: FavoriteBody):
    return (weather["explorerName"] == new_weather.explorerName and weather["cityName"] == new_weather.cityName and weather["lat"] == new_weather.lat and weather["lon"] == new_weather.lon)