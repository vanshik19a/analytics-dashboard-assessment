import { useMemo, useState } from "react";

type Row = {
  Make?: string;
  Model?: string;
  ModelYear?: number | string;
  ElectricRange?: number | string;
  ElectricVehicleType?: string;
  County?: string;
};

export default function DataTable({ rows }: { rows: Row[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows.slice(0, 200);
    return rows.filter(r =>
      [r.Make, r.Model, r.County, r.ElectricVehicleType]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(s))
    ).slice(0, 200);
  }, [rows, q]);

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search make/model/county/type…"
        className="w-full border rounded-lg px-3 py-2 mb-3"
      />
      <div className="overflow-auto max-h-80 border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="text-left p-2">Make</th>
              <th className="text-left p-2">Model</th>
              <th className="text-left p-2">Year</th>
              <th className="text-left p-2">Range</th>
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">County</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="p-2">{r.Make}</td>
                <td className="p-2">{r.Model}</td>
                <td className="p-2">{r.ModelYear as any}</td>
                <td className="p-2">{r.ElectricRange as any}</td>
                <td className="p-2">{r.ElectricVehicleType}</td>
                <td className="p-2">{r.County}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-2">Showing up to 200 rows for speed.</p>
    </div>
  );
}
