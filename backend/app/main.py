from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.cities import router as citiesRoute
from routes.weather import router as weatherRoute
from routes.favorites import router as favoritesRoute
from middleware.timing import TimingMiddleware
from middleware.error_handler import error_handler

app = FastAPI()

origins = ["*"]
app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])

app.add_middleware(TimingMiddleware)
app.exception_handler(Exception)(error_handler)
app.include_router(citiesRoute, prefix="/city")
app.include_router(weatherRoute, prefix="/weather")
app.include_router(favoritesRoute, prefix="/favorites")

@app.get("/health")
def get_health() -> dict:
    return {"message": "The server is runnig"}
