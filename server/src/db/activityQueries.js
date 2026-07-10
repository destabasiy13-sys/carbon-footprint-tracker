import pool from '../config/db.js';

const ACTIVITY_COLUMNS = `
  id, user_id, category, activity_date, co2e_kg,
  transport_mode, distance_km, energy_type, energy_usage_kwh,
  diet_pattern, notes, created_at, updated_at
`;

export async function createActivity(userId, fields) {
  const {
    category,
    activity_date,
    co2e_kg,
    transport_mode,
    distance_km,
    energy_type,
    energy_usage_kwh,
    diet_pattern,
    notes,
  } = fields;

  const [result] = await pool.query(
    `INSERT INTO activity_logs
      (user_id, category, activity_date, co2e_kg, transport_mode, distance_km,
       energy_type, energy_usage_kwh, diet_pattern, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      category,
      activity_date,
      co2e_kg,
      transport_mode || null,
      distance_km || null,
      energy_type || null,
      energy_usage_kwh || null,
      diet_pattern || null,
      notes || null,
    ]
  );
  return result.insertId;
}

export async function findActivityById(userId, id) {
  const [rows] = await pool.query(
    `SELECT ${ACTIVITY_COLUMNS} FROM activity_logs WHERE id = ? AND user_id = ?`,
    [id, userId]
  );
  return rows[0] || null;
}

export async function listActivities(userId, { category, startDate, endDate } = {}) {
  const conditions = ['user_id = ?'];
  const params = [userId];

  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }
  if (startDate) {
    conditions.push('activity_date >= ?');
    params.push(startDate);
  }
  if (endDate) {
    conditions.push('activity_date <= ?');
    params.push(endDate);
  }

  const [rows] = await pool.query(
    `SELECT ${ACTIVITY_COLUMNS} FROM activity_logs
     WHERE ${conditions.join(' AND ')}
     ORDER BY activity_date DESC, id DESC`,
    params
  );
  return rows;
}

export async function updateActivity(userId, id, fields) {
  const {
    category,
    activity_date,
    co2e_kg,
    transport_mode,
    distance_km,
    energy_type,
    energy_usage_kwh,
    diet_pattern,
    notes,
  } = fields;

  const [result] = await pool.query(
    `UPDATE activity_logs SET
       category = ?, activity_date = ?, co2e_kg = ?, transport_mode = ?,
       distance_km = ?, energy_type = ?, energy_usage_kwh = ?, diet_pattern = ?, notes = ?
     WHERE id = ? AND user_id = ?`,
    [
      category,
      activity_date,
      co2e_kg,
      transport_mode || null,
      distance_km || null,
      energy_type || null,
      energy_usage_kwh || null,
      diet_pattern || null,
      notes || null,
      id,
      userId,
    ]
  );
  return result.affectedRows > 0;
}

export async function deleteActivity(userId, id) {
  const [result] = await pool.query(
    'DELETE FROM activity_logs WHERE id = ? AND user_id = ?',
    [id, userId]
  );
  return result.affectedRows > 0;
}

export async function getTrend(userId, startDate, endDate) {
  const [rows] = await pool.query(
    `SELECT activity_date, SUM(co2e_kg) AS total_co2e
     FROM activity_logs
     WHERE user_id = ? AND activity_date BETWEEN ? AND ?
     GROUP BY activity_date
     ORDER BY activity_date ASC`,
    [userId, startDate, endDate]
  );
  return rows;
}

export async function getBreakdown(userId, startDate, endDate) {
  const [rows] = await pool.query(
    `SELECT category, SUM(co2e_kg) AS total_co2e
     FROM activity_logs
     WHERE user_id = ? AND activity_date BETWEEN ? AND ?
     GROUP BY category`,
    [userId, startDate, endDate]
  );
  return rows;
}

export async function getCategoryTotal(userId, category, startDate, endDate) {
  const [rows] = await pool.query(
    `SELECT COALESCE(SUM(co2e_kg), 0) AS total_co2e
     FROM activity_logs
     WHERE user_id = ? AND category = ? AND activity_date BETWEEN ? AND ?`,
    [userId, category, startDate, endDate]
  );
  return Number(rows[0].total_co2e);
}
