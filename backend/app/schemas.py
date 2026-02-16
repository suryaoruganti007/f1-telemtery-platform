from pydantic import BaseModel

class TelemetryCreate(BaseModel):
    driver: str
    speed: float
    lap: int

class TelemetryOut(TelemetryCreate):
    id: int

    class Config:
        from_attributes = True
