import pool from '../config/db.js';

export async function createGoal(userId, fields) {
  const { category, target_reduction_percent, start_date, end_date } = fields;
  const [result] = await pool.query(
    `INSERT INTO goals (user_id, category, target_reduction_percent, start_date, end_date)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, category, target_reduction_percent, start_date, end_date]
  );
  return result.insertId;
}

export async function listGoals(userId) {
  const [rows] = await pool.query(
    `SELECT id, user_id, category, target_reduction_percent, start_date, end_date, created_at
     FROM goals WHERE user_id = ? ORDER BY start_date DESC`,
    [userId]
  );
  return rows;
}

export async function findGoalById(userId, id) {
  const [rows] = await pool.query(
    `SELECT id, user_id, category, target_reduction_percent, start_date, end_date, created_at
     FROM goals WHERE id = ? AND user_id = ?`,
    [id, userId]
  );
  return rows[0] || null;
}

export async function deleteGoal(userId, id) {
  const [result] = await pool.query('DELETE FROM goals WHERE id = ? AND user_id = ?', [id, userId]);
  return result.affectedRows > 0;
}
