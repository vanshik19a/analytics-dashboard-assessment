import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
type Row = { Make?: string };

export default function MakeBar({ rows }: { rows: Row[] }) {
  const counts: Record<string, number> = {};
  rows.forEach(r => {
    const k = (r.Make || "Unknown").toString();
    counts[k] = (counts[k] || 0) + 1;
  });
  const data = Object.entries(counts)
    .map(([Make, Count]) => ({ Make, Count }))
    .sort((a, b) => b.Count - a.Count)
    .slice(0, 10);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="Make" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Count" fill="#3b82f6" /> {/* blue-600 */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
