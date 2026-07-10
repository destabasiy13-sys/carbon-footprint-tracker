import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LINE_COLOR = '#2a78d6';
const GRIDLINE_COLOR = '#e1e0d9';
const AXIS_COLOR = '#898781';

export default function TrendChart({ data }) {
  if (data.length === 0) {
    return <p className="text-muted">No data in this period yet.</p>;
  }

  const chartData = data.map((row) => ({
    date: row.activity_date,
    total: Number(row.total_co2e),
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={GRIDLINE_COLOR} strokeDasharray="0" vertical={false} />
        <XAxis dataKey="date" stroke={AXIS_COLOR} tick={{ fill: AXIS_COLOR, fontSize: 12 }} />
        <YAxis stroke={AXIS_COLOR} tick={{ fill: AXIS_COLOR, fontSize: 12 }} width={40} />
        <Tooltip
          formatter={(value) => [`${value.toFixed(2)} kg CO2e`, 'Total']}
          contentStyle={{ borderRadius: 6, borderColor: GRIDLINE_COLOR }}
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke={LINE_COLOR}
          strokeWidth={2}
          fill={LINE_COLOR}
          fillOpacity={0.1}
          dot={{ r: 4, fill: LINE_COLOR, stroke: '#fcfcfb', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
