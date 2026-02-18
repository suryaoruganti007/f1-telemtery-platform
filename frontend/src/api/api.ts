import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
