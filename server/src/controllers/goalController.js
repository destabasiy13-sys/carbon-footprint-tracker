import { createGoal, listGoals, deleteGoal } from '../db/goalQueries.js';
import { getCategoryTotal } from '../db/activityQueries.js';

function addDays(dateStr, days) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function daysBetween(startStr, endStr) {
  const start = new Date(startStr);
  const end = new Date(endStr);
  return Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
}

async function computeProgress(userId, goal) {
  const today = new Date().toISOString().slice(0, 10);
  const actualEnd = goal.end_date < today ? goal.end_date : today;

  const periodLength = daysBetween(goal.start_date, goal.end_date);
  const baselineStart = addDays(goal.start_date, -periodLength);
  const baselineEnd = addDays(goal.start_date, -1);

  const [baselineTotal, actualTotal] = await Promise.all([
    getCategoryTotal(userId, goal.category, baselineStart, baselineEnd),
    getCategoryTotal(userId, goal.category, goal.start_date, actualEnd),
  ]);

  let percentReduced = null;
  if (baselineTotal > 0) {
    percentReduced = ((baselineTotal - actualTotal) / baselineTotal) * 100;
  }

  return {
    baselineTotal,
    actualTotal,
    percentReduced,
    targetPercent: Number(goal.target_reduction_percent),
    onTrack: percentReduced !== null ? percentReduced >= Number(goal.target_reduction_percent) : null,
  };
}

export async function postGoal(req, res, next) {
  try {
    const { category, target_reduction_percent, start_date, end_date } = req.body;
    if (!category || !target_reduction_percent || !start_date || !end_date) {
      return res.status(400).json({
        error: 'category, target_reduction_percent, start_date, and end_date are required',
      });
    }
    if (end_date <= start_date) {
      return res.status(400).json({ error: 'end_date must be after start_date' });
    }

    const id = await createGoal(req.session.userId, req.body);
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
}

export async function getGoals(req, res, next) {
  try {
    const goals = await listGoals(req.session.userId);
    const withProgress = await Promise.all(
      goals.map(async (goal) => ({
        ...goal,
        progress: await computeProgress(req.session.userId, goal),
      }))
    );
    res.json(withProgress);
  } catch (err) {
    next(err);
  }
}

export async function deleteGoalHandler(req, res, next) {
  try {
    const deleted = await deleteGoal(req.session.userId, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
