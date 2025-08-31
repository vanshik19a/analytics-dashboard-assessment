import { useEffect, useMemo, useState } from "react";
import Papa, { ParseResult } from "papaparse";
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
      transformHeader: (h: string) => h.trim().toLowerCase(),
      error: (e: unknown) => {
        const msg =
          typeof e === "object" && e && "message" in (e as any)
            ? String((e as any).message)
            : "Failed to load CSV";
        setErr(msg);
        setLoading(false);
      },
      complete: (res: ParseResult<Record<string, unknown>>) => {
        try {
          const raw = (res.data as Record<string, unknown>[])
            .filter(Boolean);

          const clean: Row[] = raw.map((r) => {
            const get = (k: string) =>
              (r[k] as string | number | undefined) ?? undefined;

            const modelYearRaw = get("model year");
            const rangeRaw = get("electric range");

            return {
              Make: String(get("make") ?? ""),
              Model: String(get("model") ?? ""),
              ModelYear:
                typeof modelYearRaw === "number"
                  ? modelYearRaw
                  : modelYearRaw
                  ? Number(String(modelYearRaw).replace(/[^\d]/g, "")) ||
                    String(modelYearRaw)
                  : "",
              ElectricRange:
                typeof rangeRaw === "number"
                  ? rangeRaw
                  : rangeRaw
                  ? Number(String(rangeRaw).replace(/[^\d]/g, "")) ||
                    String(rangeRaw)
                  : undefined,
              ElectricVehicleType: get("electric vehicle type")
                ? String(get("electric vehicle type"))
                : undefined,
              County: get("county") ? String(get("county")) : undefined,
            };
          });

          const finalRows = clean.filter((r) => r.Make || r.Model);
          setRows(finalRows);

          if (finalRows.length) {
            console.log("RAW HEADERS:", Object.keys(raw[0] ?? {}));
            console.log("Sample rows:", finalRows.slice(0, 3));
          }
        } catch (e) {
          setErr(e instanceof Error ? e.message : "Failed to process CSV");
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
        selectedCounty === "All" ? true : (r.County ?? "") === selectedCounty;
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
