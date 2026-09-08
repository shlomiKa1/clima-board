from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def get_health() -> dict:
    return {"message": "The server is runnig"}