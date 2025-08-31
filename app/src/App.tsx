import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import MakeBar from "./components/MakeBar";
import YearLine from "./components/YearLine";
import TypePie from "./components/TypePie";
import DataTable from "./components/DataTable";
import KPIs from "./components/KPIs";
import Filters from "./components/Filters";

type Row = {
  Make: string;
  Model: string;
  ModelYear: number | string;
  ElectricRange?: number | string;
  ElectricVehicleType?: string;
  County?: string;
};

export default function App() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedCounty, setSelectedCounty] = useState<string>("All");

  useEffect(() => {
    Papa.parse("/data/Electric_Vehicle_Population_Data.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim().toLowerCase(),
      error: (e) => {
        setErr(e.message || "Failed to load CSV");
        setLoading(false);
      },
      complete: (res) => {
        try {
          const raw = (res.data as any[]).filter(Boolean);
          const clean: Row[] = raw.map((r) => ({
            Make: (r["make"] ?? "").toString(),
            Model: (r["model"] ?? "").toString(),
            ModelYear:
              typeof r["model year"] === "number"
                ? r["model year"]
                : r["model year"]
                ? Number(String(r["model year"]).replace(/[^\d]/g, "")) ||
                  String(r["model year"])
                : "",
            ElectricRange:
              typeof r["electric range"] === "number"
                ? r["electric range"]
                : r["electric range"]
                ? Number(String(r["electric range"]).replace(/[^\d]/g, "")) ||
                  String(r["electric range"])
                : undefined,
            ElectricVehicleType: r["electric vehicle type"]
              ? String(r["electric vehicle type"])
              : undefined,
            County: r["county"] ? String(r["county"]) : undefined,
          }));
          const finalRows = clean.filter((r) => r.Make || r.Model);
          setRows(finalRows);
        } catch (e: any) {
          setErr(e?.message || "Failed to process CSV");
        } finally {
          setLoading(false);
        }
      },
    });
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const byYear =
        selectedYear === "All"
          ? true
          : Number(r.ModelYear) === Number(selectedYear);
      const byCounty =
        selectedCounty === "All"
          ? true
          : (r.County || "") === selectedCounty;
      return byYear && byCounty;
    });
  }, [rows, selectedYear, selectedCounty]);

  if (loading) return <div className="p-6">Loading dataset…</div>;
  if (err) return <div className="p-6 text-red-600">Error: {err}</div>;
  if (!rows.length) return <div className="p-6">No data found.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container py-6">
          <h1 className="text-2xl font-bold">EV Analytics Dashboard</h1>
          <p className="text-sm text-gray-600">
            Insights from the Electric Vehicle Population dataset
          </p>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        <KPIs rows={filtered} />
        <Filters
          rows={rows}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedCounty={selectedCounty}
          setSelectedCounty={setSelectedCounty}
        />

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Top Makes (count)</h2>
            <MakeBar rows={filtered} />
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Adoption by Year</h2>
            <YearLine rows={filtered} />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Vehicle Type Share</h2>
            <TypePie rows={filtered} />
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Browse Records</h2>
            <DataTable rows={filtered} />
          </div>
        </section>
      </main>
    </div>
  );
}
