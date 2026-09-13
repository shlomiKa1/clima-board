from pydantic import BaseModel, Field, ConfigDict

class FavoriteBody(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    explorerName: str = Field(min_length=2, max_length=100)
    cityName: str = Field(min_length=2, max_length=100)
    lat: float = Field(min=-90, max=90)
    lon: float = Field(min=-180, max=180)
    