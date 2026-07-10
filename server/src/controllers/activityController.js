import {
  createActivity,
  findActivityById,
  listActivities,
  updateActivity,
  deleteActivity,
} from '../db/activityQueries.js';
import { calculateCo2e } from '../utils/calculateEmissions.js';

const VALID_CATEGORIES = ['transport', 'energy', 'food'];

function validateFields(category, fields) {
  if (!VALID_CATEGORIES.includes(category)) {
    return 'category must be one of transport, energy, food';
  }
  if (category === 'transport' && (!fields.transport_mode || !fields.distance_km)) {
    return 'transport_mode and distance_km are required for transport entries';
  }
  if (category === 'energy' && (!fields.energy_type || !fields.energy_usage_kwh)) {
    return 'energy_type and energy_usage_kwh are required for energy entries';
  }
  if (category === 'food' && !fields.diet_pattern) {
    return 'diet_pattern is required for food entries';
  }
  return null;
}

export async function getActivities(req, res, next) {
  try {
    const { category, startDate, endDate } = req.query;
    const activities = await listActivities(req.session.userId, { category, startDate, endDate });
    res.json(activities);
  } catch (err) {
    next(err);
  }
}

export async function getActivity(req, res, next) {
  try {
    const activity = await findActivityById(req.session.userId, req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (err) {
    next(err);
  }
}

export async function postActivity(req, res, next) {
  try {
    const { category, activity_date } = req.body;
    if (!category || !activity_date) {
      return res.status(400).json({ error: 'category and activity_date are required' });
    }

    const validationError = validateFields(category, req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const co2e_kg = calculateCo2e(category, req.body);
    const id = await createActivity(req.session.userId, { ...req.body, co2e_kg });
    const activity = await findActivityById(req.session.userId, id);
    res.status(201).json(activity);
  } catch (err) {
    next(err);
  }
}

export async function putActivity(req, res, next) {
  try {
    const { category, activity_date } = req.body;
    if (!category || !activity_date) {
      return res.status(400).json({ error: 'category and activity_date are required' });
    }

    const validationError = validateFields(category, req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const co2e_kg = calculateCo2e(category, req.body);
    const updated = await updateActivity(req.session.userId, req.params.id, {
      ...req.body,
      co2e_kg,
    });
    if (!updated) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    const activity = await findActivityById(req.session.userId, req.params.id);
    res.json(activity);
  } catch (err) {
    next(err);
  }
}

export async function deleteActivityHandler(req, res, next) {
  try {
    const deleted = await deleteActivity(req.session.userId, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
