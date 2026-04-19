# Shunmugam Textiles — Production & Sales Management System

> A web-based internal management platform built to digitize production tracking and sales operations for **Shunmugam Textiles**, used daily by supervisors and administrators.

---

## About the Project

Shunmugam Textiles previously relied on manual notebook-based tracking for production entry, weaver management, and sales reporting. This system replaces that process entirely — eliminating data entry errors and saving **2–3 hours of operational effort per day**.

The platform supports two types of users:
- **Admins** — Manage supervisors, weavers, products, and view full reports.
- **Supervisors** — Enter production data and generate/export receipts.

---

## Features

### Admin Panel
- **Dashboard** — Live stats: total supervisors, weavers, and products
- **Supervisor Management** — Add, edit, activate/deactivate supervisor accounts
- **Weaver Management** — Maintain weaver records with image uploads
- **Product Management** — Manage the product catalog with image support (via Cloudinary)
- **Reports** — View, filter, and export production receipts across date ranges, employees, and products
- **Credential Management** — Admin can update their own username and password in-app

### Supervisor Panel
- **Dashboard** — View total receipts count
- **Reports** — View and export receipts relevant to their work

### Public Website
- Home, Products, About, and Contact pages for general visitors

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 19 + Vite 7 |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Database | Firebase Firestore |
| Auth Storage | Firebase Auth + localStorage sessions |
| File Storage (Images) | Cloudinary |
| Excel Export | xlsx-js-style |
---

