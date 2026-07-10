# Carbon Footprint Tracker — Project Overview

## Purpose

Carbon Footprint Tracker is a web application for logging day-to-day activities — transport, home energy use, and food choices — and converting them into an estimated CO2e footprint using published emission factors. It turns an abstract goal ("reduce my environmental impact") into something measurable and trackable over time.

## Problem

Most people have no simple way to see how their daily choices add up environmentally. Estimating the carbon impact of a commute, a flight, or a month of electricity use requires knowing the right emission factors and doing the math by hand — so most people never actually see the numbers, and reduction goals stay vague ("drive less") rather than measurable ("cut transport emissions by 20% this quarter").

## Solution

Users log activities into a small number of categories (transport by mode and distance, home energy by usage, food by diet pattern). Each entry is converted to an estimated CO2e value using standard published emission factors, stored, and aggregated into a personal dashboard: totals over time, a breakdown by category, and progress against a self-set reduction goal.

## Core Features

**Authentication**
- Register, login, logout
- Session-based authentication

**Activity Logging**
- Transport entries (mode, distance)
- Home energy entries (electricity/gas usage)
- Food/diet entries (diet pattern or specific food category)
- Edit and delete past entries

**Emission Calculation**
- Each entry converted to estimated CO2e using published per-unit emission factors (kg CO2e per km by transport mode, per kWh, per diet pattern)
- Daily, weekly, and monthly aggregate totals
- Breakdown by category

**Dashboard**
- Footprint trend over time (chart)
- Category breakdown (chart)
- Progress against a personal reduction goal

**Goals**
- Set a target reduction (e.g. percentage decrease in a category over a time window)
- Track actual vs. target over the goal period

**Insights**
- Simple rule-based suggestions based on which category contributes most to a user's footprint

## Security

- Passwords are hashed before storage
- All activity logs, goals, and dashboard data are scoped to the authenticated user
- Private routes require an active session

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), a charting library (e.g. Recharts) |
| Backend | Node.js, Express |
| Database | MySQL |
| Auth | express-session, bcrypt |

## Scope

This is a personal tracking tool using publicly published average emission factors, not a certified carbon-accounting system and not integrated with real-time utility or vehicle sensor data. It's scoped to cover:

- Category-weighted computation over user-submitted data
- Time-series aggregation and trend visualization
- Goal-tracking logic (target vs. actual over a period)
- Standard authentication and per-user data isolation
