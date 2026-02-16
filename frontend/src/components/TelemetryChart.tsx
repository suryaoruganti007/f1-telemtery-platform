import Plot from "react-plotly.js";

export default function TelemetryChart({ data }: any) {
  return (
    <Plot
      data={[
        {
          x: data.map((d: any) => d.Distance),
          y: data.map((d: any) => d.Speed),
          type: "scatter",
          mode: "lines",
        },
      ]}
      layout={{
        title: {
          text: "Official FIA Telemetry (Speed vs Distance)",
        },
        paper_bgcolor: "black",
        plot_bgcolor: "black",
        font: { color: "white" },

        xaxis: {
          title: {
            text: "Distance (meters)",
            font: { size: 16 },
          },
          showgrid: true,
          gridcolor: "#222",
        },

        yaxis: {
          title: {
            text: "Speed (km/h)",
            font: { size: 16 },
          },
          showgrid: true,
          gridcolor: "#222",
        },
      }}
    />
  );
}
