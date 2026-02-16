import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOfficial } from "../api/api";
import TelemetryChart from "../components/TelemetryChart";

export default function Dashboard() {
  const [year, setYear] = useState(2023);
  const [gp, setGp] = useState("Monaco");
  const [session, setSession] = useState("Q");
  const [driver, setDriver] = useState("VER");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["officialTelemetry", year, gp, session, driver],
    queryFn: () => fetchOfficial(year, gp, session, driver),
    enabled: false, // prevents auto-run
  });

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">F1 TELEMETRY ANALYTICS</h1>

      <div className="flex gap-4 mb-6">
        <input
          className="bg-gray-800 p-2 rounded"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          placeholder="Year"
        />

        <input
          className="bg-gray-800 p-2 rounded"
          value={gp}
          onChange={(e) => setGp(e.target.value)}
          placeholder="Grand Prix"
        />

        <input
          className="bg-gray-800 p-2 rounded"
          value={session}
          onChange={(e) => setSession(e.target.value)}
          placeholder="Session (R/Q/FP1)"
        />

        <input
          className="bg-gray-800 p-2 rounded"
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
          placeholder="Driver (VER/HAM)"
        />

        <button
          onClick={() => refetch()}
          className="bg-cyan-500 px-4 py-2 rounded"
        >
          Load Data
        </button>
      </div>

      {isLoading && <div>Loading official telemetry...</div>}

      {data && <TelemetryChart data={data} />}
    </div>
  );
}
