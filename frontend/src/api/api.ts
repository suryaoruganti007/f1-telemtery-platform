import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const fetchOfficial = async (
  year: number,
  grand_prix: string,
  session: string,
  driver: string
) => {
  const res = await api.get("/official-telemetry", {
    params: { year, grand_prix, session, driver },
  });

  return res.data;
};
