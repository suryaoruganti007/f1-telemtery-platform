from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .database import SessionLocal
from . import crud, schemas
from .f1_service import get_session_telemetry

router = APIRouter()

# ---------- DATABASE DEPENDENCY ----------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------- LOCAL DATABASE ROUTES ----------

@router.post("/telemetry")
def create(data: schemas.TelemetryCreate, db: Session = Depends(get_db)):
    return crud.create_telemetry(db, data)

@router.get("/telemetry")
def read_all(db: Session = Depends(get_db)):
    return crud.get_all(db)

# ---------- OFFICIAL FIA TELEMETRY ROUTE ----------

@router.get("/official-telemetry")
def official_telemetry(
    year: int,
    grand_prix: str,
    session: str,
    driver: str
):
    """
    Example:
    /api/official-telemetry?year=2023&grand_prix=Monaco&session=Q&driver=VER
    """
    return get_session_telemetry(year, grand_prix, session, driver)
