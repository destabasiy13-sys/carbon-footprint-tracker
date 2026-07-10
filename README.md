# Carbon Footprint Tracker

A web app for logging daily transport, energy, and food choices and converting them into an estimated CO2e footprint, tracked over time against a personal reduction goal.

## Stack

- Frontend: React (Vite), Bootstrap, Recharts
- Backend: Node.js, Express.js
- Database: MySQL (raw SQL via `mysql2`, no ORM)
- Auth: express-session, bcrypt

## Status

Core app is built and working end-to-end: register/login, activity logging (transport/energy/food) with server-computed CO2e, a dashboard with trend and category-breakdown charts, and goal tracking with baseline-vs-actual progress.

## Project Structure

```
client/   React (Vite) single-page app
server/   Express API
```

## Local Setup

### 1. Database

Requires a local MySQL server. Create the schema:

```bash
mysql -u root -p < server/sql/schema.sql
```

This creates a `carbon_footprint_tracker` database with `users`, `activity_logs`, and `goals` tables.

### 2. Server

```bash
cd server
npm install
cp .env.example .env   # fill in your DB credentials and a real SESSION_SECRET
npm run dev            # http://localhost:5000
```

### 3. Client

```bash
cd client
npm install
cp .env.example .env   # defaults to http://localhost:5000/api
npm run dev             # http://localhost:5173
```

Open http://localhost:5173, register an account, and log your first activity.

## Notes

- Emission factors (`server/src/config/emissionFactors.js`) are approximate, publicly-published averages — this is an illustrative personal tracker, not a certified carbon-accounting system.
- A goal's progress compares its date range against an equal-length baseline window immediately before it, so a few days of prior activity data is needed before a newly created goal shows a meaningful percentage.
