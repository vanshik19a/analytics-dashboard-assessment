import { useMemo } from "react";

type Row = {
  ModelYear: number | string;
  County?: string;
};

type Props = {
  rows: Row[];
  selectedYear: string;
  setSelectedYear: (v: string) => void;
  selectedCounty: string;
  setSelectedCounty: (v: string) => void;
};

export default function Filters({
  rows,
  selectedYear,
  setSelectedYear,
  selectedCounty,
  setSelectedCounty,
}: Props) {
  const years = useMemo(() => {
    const ys = Array.from(
      new Set(
        rows
          .map(r => Number(r.ModelYear))
          .filter(v => Number.isFinite(v) && v > 0)
      )
    ).sort((a, b) => a - b);
    return ys.map(String);
  }, [rows]);

  const counties = useMemo(() => {
    return Array.from(
      new Set(rows.map(r => r.County).filter(Boolean) as string[])
    ).sort((a, b) => a.localeCompare(b));
  }, [rows]);

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-xs text-gray-500 mb-1">Year</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="All">All</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-xs text-gray-500 mb-1">County</label>
        <select
          value={selectedCounty}
          onChange={(e) => setSelectedCounty(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="All">All</option>
          {counties.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </div>
  );
}
