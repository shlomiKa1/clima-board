# ClimaBoard

Weather dashboard by city name — search, current conditions, forecast, favorites, and comparison between two cities.

---

## Tech Stack

### Backend

Python + FastAPI, using [Open-Meteo](https://open-meteo.com/) (Geocoding + Forecast APIs) as the external weather data source. Favorites are persisted to a local JSON file (no database).

### Frontend

React + TypeScript (Vite), React Router for navigation, Zustand for favorites state management, Axios for HTTP calls.

---

## How to Run

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
cd app
uvicorn main:app --reload
```

Runs at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

> The server must be started from `backend/app` (not `backend/`) — internal imports are relative to that directory.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`.

---

## Entities

|     Entity     | Main fields                                                                                                      | Source                                         |
| :------------: | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
|      City      | name, country, latitude, longitude                                                                               | Open-Meteo Geocoding API                       |
| CurrentWeather | current.temperature_2m, current.apparent_temperature, current.wind_speed_10m, current.weather_code, current.time | Open-Meteo Forecast API (raw passthrough)      |
|    Forecast    | daily.time[], daily.temperature_2m_max[], daily.temperature_2m_min[]                                             | Open-Meteo Forecast API (raw passthrough)      |
|    Favorite    | id, explorerName, cityName, lat, lon, createdAt                                                                  | Local JSON file (`backend/app/data/data.json`) |
|  ExplorerName  | plain string, stored client-side only                                                                            | Browser `localStorage`                         |

> Weather responses are passed through from Open-Meteo as-is (not remapped by the backend) — field names like `temperature_2m` and the nested `current`/`daily` structure reflect Open-Meteo's own response shape, not a custom schema.

---

## Endpoints

|     Method + Path      | Input                                         | Output                                                   |
| :--------------------: | --------------------------------------------- | -------------------------------------------------------- |
|      GET /health       | —                                             | `{"message": "The server is running"}`                   |
|    GET /city/search    | `name: string` (query, 2–50 chars)            | `City[]`                                                 |
|  GET /weather/current  | `lat, lon: float` (query)                     | `CurrentWeather` (raw Open-Meteo object)                 |
| GET /weather/forecast  | `lat, lon: float`, `days: int` (1–16) (query) | `Forecast` (raw Open-Meteo object)                       |
|  GET /weather/compare  | `lat_a, lon_a, lat_b, lon_b: float` (query)   | `{ "city_a": CurrentWeather, "city_b": CurrentWeather }` |
|     GET /favorites     | `explorerName: string` (query, 2–100 chars)   | `Favorite[]`                                             |
|    POST /favorites     | body: `{ explorerName, cityName, lat, lon }`  | `Favorite`                                               |
| DELETE /favorites/{id} | —                                             | `{"message": ..., "success": true}` (HTTP 200)           |
|      POST /atbash      | body: `{ text: string }`                      | **Planned — not yet implemented**                        |

---

## Validation Rules

|     Field      | Endpoint(s)                           | Rule                                       | Status Code |
| :------------: | ------------------------------------- | ------------------------------------------ | :---------: |
|      name      | GET /city/search                      | length 2–50, required                      |     422     |
|      lat       | /weather/current, /forecast, /compare | -90 ≤ lat ≤ 90                             |     422     |
|      lon       | /weather/current, /forecast, /compare | -180 ≤ lon ≤ 180                           |     422     |
|      days      | GET /weather/forecast                 | 1 ≤ days ≤ 16                              |     422     |
|  explorerName  | /favorites (all)                      | length 2–100, required                     |     422     |
|    cityName    | POST /favorites                       | length 2–100, required                     |     422     |
|    lat/lon     | POST /favorites                       | same range as above (-90/90, -180/180)     |     422     |
| favorite (dup) | POST /favorites                       | rejected if identical entry already exists |     409     |
|       id       | DELETE /favorites/{id}                | must exist in the favorites list           |     404     |

> `/atbash` validation (non-empty text, Hebrew/English letters only) will be defined once the endpoint is implemented.

---

## Project Structure

```
clima-board/
  backend/
    app/
      main.py
      routes/
      schemas/
      services/
      middleware/
      data/            # local JSON storage (gitignored)
    requirements.txt
  frontend/
    src/
      pages/
      componets/        # note: intentional existing spelling, kept for import-path stability
      routes/
      store/            # Zustand stores
      types/
      hooks/
      utils/
      api/
  README.md
```

---

## Known Gaps

- `POST /atbash` (Atbash cipher, Hebrew + English) is defined in the original spec but not yet implemented.
- Favorites are stored in a local JSON file, not a real database — data resets are manual (not on server restart, but not portable across environments either).
