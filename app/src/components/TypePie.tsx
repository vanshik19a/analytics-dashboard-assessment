import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
type Row = { ElectricVehicleType?: string };

const palette = ["#6366f1","#f59e0b","#ef4444","#10b981","#22c55e","#3b82f6"]; // indigo/amber/red/emerald/green/blue

export default function TypePie({ rows }: { rows: Row[] }) {
  const counts: Record<string, number> = {};
  rows.forEach(r => {
    const t = (r.ElectricVehicleType || "Unknown").toString();
    counts[t] = (counts[t] || 0) + 1;
  });
  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
            {data.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
