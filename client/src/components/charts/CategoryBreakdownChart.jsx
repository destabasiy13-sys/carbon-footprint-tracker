import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

// Fixed categorical order - never reassigned per render, matches slot order
// used elsewhere in the app.
const CATEGORY_COLORS = {
  transport: '#2a78d6',
  energy: '#1baf7a',
  food: '#eda100',
};

const CATEGORY_LABELS = {
  transport: 'Transport',
  energy: 'Home Energy',
  food: 'Food',
};

const GRIDLINE_COLOR = '#e1e0d9';
const AXIS_COLOR = '#898781';

export default function CategoryBreakdownChart({ data }) {
  if (data.length === 0) {
    return <p className="text-muted">No data in this period yet.</p>;
  }

  const chartData = data.map((row) => ({
    category: row.category,
    label: CATEGORY_LABELS[row.category] || row.category,
    total: Number(row.total_co2e),
  }));

  return (
    <div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={GRIDLINE_COLOR} strokeDasharray="0" vertical={false} />
          <XAxis dataKey="label" stroke={AXIS_COLOR} tick={{ fill: AXIS_COLOR, fontSize: 12 }} />
          <YAxis stroke={AXIS_COLOR} tick={{ fill: AXIS_COLOR, fontSize: 12 }} width={40} />
          <Tooltip
            formatter={(value) => [`${value.toFixed(2)} kg CO2e`, 'Total']}
            contentStyle={{ borderRadius: 6, borderColor: GRIDLINE_COLOR }}
          />
          <Bar dataKey="total" barSize={48} radius={[4, 4, 0, 0]}>
            {chartData.map((entry) => (
              <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category]} />
            ))}
            <LabelList
              dataKey="total"
              position="top"
              formatter={(value) => value.toFixed(1)}
              style={{ fill: '#52514e', fontSize: 12 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="d-flex justify-content-center gap-3 mt-1">
        {chartData.map((entry) => (
          <span key={entry.category} className="d-flex align-items-center gap-1 small text-secondary">
            <span
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: 2,
                backgroundColor: CATEGORY_COLORS[entry.category],
              }}
            />
            {entry.label}
          </span>
        ))}
      </div>
    </div>
  );
}
