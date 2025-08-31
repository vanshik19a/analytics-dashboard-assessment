type Row = {
  Make: string;
  Model: string;
  ModelYear: number | string;
  ElectricRange?: number | string;
  ElectricVehicleType?: string;
  County?: string;
};

function fmt(n: number) {
  return n.toLocaleString();
}

export default function KPIs({ rows }: { rows: Row[] }) {
  const total = rows.length;

  const ranges = rows
    .map(r => Number(r.ElectricRange))
    .filter(v => Number.isFinite(v) && v > 0);
  const avgRange = ranges.length ? Math.round(ranges.reduce((a, b) => a + b, 0) / ranges.length) : 0;

  const makes = new Set(rows.map(r => r.Make).filter(Boolean));
  const counties = new Set(rows.map(r => r.County).filter(Boolean));

  const kpis = [
    { label: "Total EVs", value: fmt(total) },
    { label: "Avg Range", value: `${fmt(avgRange)} mi` },
    { label: "Distinct Makes", value: fmt(makes.size) },
    { label: "Counties Covered", value: fmt(counties.size) },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {kpis.map((k, i) => (
        <div key={i} className="bg-white rounded-xl shadow p-4">
          <div className="text-xs text-gray-500">{k.label}</div>
          <div className="text-2xl font-semibold">{k.value}</div>
        </div>
      ))}
    </div>
  );
}
