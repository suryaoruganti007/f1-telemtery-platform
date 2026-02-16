from sqlalchemy.orm import Session
from . import models, schemas

def create_telemetry(db: Session, data: schemas.TelemetryCreate):
    obj = models.Telemetry(**data.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_all(db: Session):
    return db.query(models.Telemetry).all()
