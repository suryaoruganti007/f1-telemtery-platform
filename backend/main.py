from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import router

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="F1 Telemetry API")

# CORS (required for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root health endpoint
@app.get("/")
def root():
    return {"service": "f1 telemetry backend"}

# Health check endpoint (for Docker / Nginx / Deployment)
@app.get("/health")
def health():
    return {"status": "ok"}

# API routes
app.include_router(router, prefix="/api", tags=["Telemetry"])
