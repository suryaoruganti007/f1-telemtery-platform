from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Telemetry(Base):
    __tablename__ = "telemetry"

    id = Column(Integer, primary_key=True, index=True)
    driver = Column(String, index=True)
    speed = Column(Float)
    lap = Column(Integer)
    timestamp = Column(String)