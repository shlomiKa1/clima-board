import json
from pathlib import Path
import os

FILE = Path(__file__).parent /"data" / "data.json"

def load_data(filename: str = FILE) -> list:
    if not os.path.exists(filename):
        return []
    try:
        with open(filename, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError) as e:
        print(f"failed to load data {e}")
        return []

def save_data(data: list, filename: str = FILE) -> None:
    try: 
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
    except (TypeError, ValueError, OSError) as e:
            print(f"Error saving data: {e}")
