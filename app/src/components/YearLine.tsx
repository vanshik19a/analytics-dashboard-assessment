import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
type Row = { ModelYear?: number | string };

export default function YearLine({ rows }: { rows: Row[] }) {
  const counts: Record<string, number> = {};
  rows.forEach(r => {
    const y = r.ModelYear?.toString();
    if (!y) return;
    counts[y] = (counts[y] || 0) + 1;
  });
  const data = Object.entries(counts)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => Number(a.year) - Number(b.year));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#10b981" dot={false} /> {/* emerald-500 */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
