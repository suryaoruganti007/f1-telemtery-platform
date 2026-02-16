# F1 Telemetry Data Analysis Platform
A full-stack web application that ingests official FIA Formula 1 telemetry data and visualizes performance metrics through an interactive analytics dashboard.
---
## Overview
This platform enables:
- Retrieval of official F1 session telemetry using FastF1
- Backend API built with FastAPI
- PostgreSQL data persistence
- Interactive frontend built with React + TypeScript + Plotly
- Dockerized multi-container deployment
- Cloud-ready infrastructure
The system visualizes telemetry such as:
- Speed vs Distance
- Throttle application
- Braking zones
- Gear shifts
- Lap performance trends
---
## Architecture
- Frontend (React + Vite)
- Backend (FastAPI)
- Database (PostgreSQL 15.5)
- Cache (Redis 7.2 – optional)
- Reverse Proxy (Nginx)
- Containerization (Docker + Docker Compose)
- React (5173)
↓
FastAPI (/api)
↓
FastF1 + SQLAlchemy
↓
PostgreSQL
---
## Tech Stack (Version Locked)
| Component | Version |
|------------|------------|
| Python | 3.11.8 |
| FastAPI | 0.110.0 |
| SQLAlchemy | 2.0.27 |
| PostgreSQL | 15.5 |
| Node | 20.11.1 |
| React | 18.2.0 |
| Vite | 5.1.4 |
| Docker | 24+ |
| Redis | 7.2 |
| Plotly | 2.27.0 |
---
## Features
### Backend
- REST API for telemetry data
- Official FIA session ingestion via FastF1
- SQLAlchemy ORM integration
- CORS configuration for frontend communication
- Health check endpoints
### Frontend
- Clean dark analytics dashboard
- Interactive Plotly graphs
- Dynamic session selection (Year, GP, Session, Driver)
- Real-time API fetching with React Query
### DevOps
- Multi-container Docker architecture
- Environment variable isolation
- Production-ready reverse proxy
- Cloud deployable (Railway / Render / AWS EC2)
---
## Project Structure
```
f1-telemtery-platform/
├── .dockerignore
├── .gitignore
├── backend/
│   ├── Dockerfile
│   ├── app/
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── f1_service.py
│   │   ├── models.py
│   │   ├── routes.py
│   │   └── schemas.py
│   ├── cache/
│   │   ├── 2021/
│   │   │   └── 2021-05-23_Monaco_Grand_Prix/
│   │   │       └── 2021-05-20_Practice_1/
│   │   │           ├── _extended_timing_data.ff1pkl
│   │   │           ├── car_data.ff1pkl
│   │   │           ├── driver_info.ff1pkl
│   │   │           ├── position_data.ff1pkl
│   │   │           ├── race_control_messages.ff1pkl
│   │   │           ├── session_info.ff1pkl
│   │   │           ├── session_status_data.ff1pkl
│   │   │           ├── timing_app_data.ff1pkl
│   │   │           ├── track_status_data.ff1pkl
│   │   │           └── weather_data.ff1pkl
│   │   ├── 2023/
│   │   │   └── 2023-05-28_Monaco_Grand_Prix/
│   │   │       └── 2023-05-27_Qualifying/
│   │   │           ├── _extended_timing_data.ff1pkl
│   │   │           ├── car_data.ff1pkl
│   │   │           ├── driver_info.ff1pkl
│   │   │           ├── position_data.ff1pkl
│   │   │           ├── race_control_messages.ff1pkl
│   │   │           ├── session_info.ff1pkl
│   │   │           ├── session_status_data.ff1pkl
│   │   │           ├── timing_app_data.ff1pkl
│   │   │           ├── track_status_data.ff1pkl
│   │   │           └── weather_data.ff1pkl
│   │   ├── 2025/
│   │   │   └── 2025-12-07_Abu_Dhabi_Grand_Prix/
│   │   │       └── 2025-12-07_Race/
│   │   │           ├── _extended_timing_data.ff1pkl
│   │   │           ├── car_data.ff1pkl
│   │   │           ├── driver_info.ff1pkl
│   │   │           ├── lap_count.ff1pkl
│   │   │           ├── position_data.ff1pkl
│   │   │           ├── race_control_messages.ff1pkl
│   │   │           ├── session_info.ff1pkl
│   │   │           ├── session_status_data.ff1pkl
│   │   │           ├── timing_app_data.ff1pkl
│   │   │           ├── track_status_data.ff1pkl
│   │   │           └── weather_data.ff1pkl
│   │   └── fastf1_http_cache.sqlite
│   ├── main.py
│   └── requirements.txt
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── App.tsx
│   │   ├── api/
│   │   │   └── api.ts
│   │   ├── components/
│   │   │   └── TelemetryChart.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── pages/
│   │       └── Dashboard.tsx
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── nginx.conf
```

---
## Running Locally (Without Docker)
### Backend
- cd backend
- python -m venv venv
- venv\Scripts\activate
- pip install -r requirements.txt
- uvicorn main:app --reload
Backend available at:
http://localhost:8000/docs
### Frontend
- cd frontend
- npm install
- npm run dev
Frontend available at:
http://localhost:5173
---
## Running With Docker
From project root:
docker compose up --build
Services exposed:
- Frontend → http://localhost:5173
- Backend → http://localhost:8000
- PostgreSQL → 5432
To stop:
docker compose down
---
## Official Telemetry Endpoint
Example request:
GET /api/official-telemetry?year=2023&grand_prix=Monaco&session=Q&driver=VER
Supported session codes:
- R → Race
- Q → Qualifying
- FP1
- FP2
- FP3
Driver examples:
VER, HAM, LEC, SAI, NOR, ALO, RUS
---
## Deployment
### Option 1 – Railway
- Connect GitHub repo
- Auto-detect Docker
- Deploy
- Use provided public URL
### Option 2 – Render
- Create backend + frontend services
- Use managed PostgreSQL
### Option 3 – AWS EC2
- Ubuntu 22.04
- Install Docker
- Clone repo
- Run `docker compose up -d`
- Configure HTTPS via Certbot
---
## Environment Variables
### Backend
DATABASE_URL=postgresql://user:password@host:5432/db
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
### Frontend
VITE_API_URL=https://your-domain/api
---
## Future Improvements
- Multi-driver comparison overlay
- Sector time analysis
- Lap delta visualization
- Tire compound tracking
- Driver comparison heatmaps
- Authentication layer
- CI/CD pipeline
- Kubernetes deployment
---
## License
Educational and research use only.
Telemetry data sourced via FastF1 using publicly available FIA timing feeds.
---
## Author
Surya
Full-Stack Developer | Data Systems | Performance Analytics
