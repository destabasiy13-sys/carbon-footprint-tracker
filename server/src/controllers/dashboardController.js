import { getTrend, getBreakdown } from '../db/activityQueries.js';

const CATEGORY_LABELS = {
  transport: 'transport',
  energy: 'home energy',
  food: 'food',
};

function defaultDateRange() {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

function buildInsight(breakdown) {
  if (breakdown.length === 0) {
    return 'Log some activities to see personalized insights.';
  }
  const largest = breakdown.reduce((max, row) =>
    Number(row.total_co2e) > Number(max.total_co2e) ? row : max
  );
  const label = CATEGORY_LABELS[largest.category] || largest.category;
  return `Your ${label} activities are your largest source of emissions in this period.`;
}

export async function getSummary(req, res, next) {
  try {
    const defaults = defaultDateRange();
    const startDate = req.query.startDate || defaults.startDate;
    const endDate = req.query.endDate || defaults.endDate;

    const [trend, breakdown] = await Promise.all([
      getTrend(req.session.userId, startDate, endDate),
      getBreakdown(req.session.userId, startDate, endDate),
    ]);

    res.json({
      trend,
      breakdown,
      insight: buildInsight(breakdown),
    });
  } catch (err) {
    next(err);
  }
}
