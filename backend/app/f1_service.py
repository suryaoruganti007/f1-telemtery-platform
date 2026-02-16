import fastf1
import pandas as pd

fastf1.Cache.enable_cache("cache")

def get_session_telemetry(year: int, grand_prix: str, session_type: str, driver_code: str):
    session = fastf1.get_session(year, grand_prix, session_type)
    session.load()

    driver = session.laps.pick_driver(driver_code).pick_fastest()
    telemetry = driver.get_car_data().add_distance()

    df = telemetry[["Distance", "Speed"]]

    return df.to_dict(orient="records")
