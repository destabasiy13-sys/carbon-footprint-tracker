CREATE DATABASE IF NOT EXISTS carbon_footprint_tracker;
USE carbon_footprint_tracker;

CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  user_id          INT NOT NULL,
  category         ENUM('transport', 'energy', 'food') NOT NULL,
  activity_date    DATE NOT NULL,
  co2e_kg          DECIMAL(10,3) NOT NULL,

  transport_mode   ENUM('car', 'bus', 'train', 'bike_walk', 'flight_short_haul') NULL,
  distance_km      DECIMAL(8,2) NULL,

  energy_type      ENUM('electricity', 'natural_gas') NULL,
  energy_usage_kwh DECIMAL(10,2) NULL,

  diet_pattern     ENUM('meat_heavy', 'average', 'vegetarian', 'vegan') NULL,

  notes            VARCHAR(255) NULL,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_date (user_id, activity_date),
  INDEX idx_user_category (user_id, category)
);

CREATE TABLE IF NOT EXISTS goals (
  id                        INT AUTO_INCREMENT PRIMARY KEY,
  user_id                   INT NOT NULL,
  category                  ENUM('transport', 'energy', 'food') NOT NULL,
  target_reduction_percent  DECIMAL(5,2) NOT NULL,
  start_date                DATE NOT NULL,
  end_date                  DATE NOT NULL,
  created_at                TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (user_id)
);
