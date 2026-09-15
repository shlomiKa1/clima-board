from pydantic import BaseModel, Field

class Atbash (BaseModel):
    name: str = Field(..., pattern=r"^[a-zA-Zא-ת\s]+$")