from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.cities import router as cities_route
from routes.weather import router as weather_route
from routes.favorites import router as favorites_route
from middleware.timing import TimingMiddleware
from middleware.error_handler import error_handler

app = FastAPI()

origins = ["http://localhost:5173"]
app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])

app.add_middleware(TimingMiddleware)
app.exception_handler(Exception)(error_handler)
app.include_router(cities_route, prefix="/city")
app.include_router(weather_route, prefix="/weather")
app.include_router(favorites_route, prefix="/favorites")

@app.get("/health")
def get_health() -> dict:
    return {"message": "The server is running"}