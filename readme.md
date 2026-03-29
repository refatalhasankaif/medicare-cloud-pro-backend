# Medi-Cloud-Pro — Backend

> A production-ready healthcare management API for online doctor consultations, appointment scheduling, prescriptions, and payment processing.

---

## 🌐 Live URLs

| | Link |
|---|---|
| 🌐 Backend Live | — |
| 🖥️ Frontend Live | — |

---

## 🎥 Video Explanation

👉 —

A complete walkthrough of the project covering features, architecture, and implementation details.

---

## 📦 Repositories

| | Link |
|---|---|
| 📦 Backend Repo | [github.com/refatalhasankaif/medi-cloud-pro-backend](https://github.com/refatalhasankaif/medi-cloud-pro-backend) |
| 🎨 Frontend Repo | — |

---

## 📖 Overview

Medi-Cloud-Pro is a full-stack healthcare platform backend that enables patients to book appointments with doctors, attend video consultations, receive digital prescriptions, and manage medical records. The backend is built with a modular, layered architecture using Node.js and Express 5, backed by PostgreSQL via Prisma ORM, and secured with JWT-based session authentication via better-auth.

Key capabilities include multi-role access control (Super Admin, Admin, Doctor, Patient), complete appointment lifecycle management, Stripe-powered payment processing for consultation fees, digital prescriptions, and medical document storage via cloud.

---

## 🗂️ Flow Diagram

![Flow Diagram](https://i.ibb.co.com/spSYzR7w/Screenshot-From-2026-03-29-13-33-09.png)

---

## 🗂️ Entity Relationship Diagram

👉 [View Full ERD on Google Drive](https://drive.google.com/file/d/106yNznGtmcH3-AD-2dC3wYOO_a7Yn4no/view?usp=sharing)

![ERD Diagram](https://i.ibb.co.com/h1WmDHBr/PH-Healthcare-Backend-ERD-drawio.png)

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js 5 |
| Language | TypeScript |
| Database | PostgreSQL (NeonDB) |
| ORM | Prisma |
| Authentication | better-auth (JWT + Sessions) |
| Payments | Stripe |
| Caching | Redis |
| File Storage | AWS S3 |
| Package Manager | pnpm |

---

## 🚀 Features

- **Authentication** — Multi-role JWT auth with session management via better-auth
- **Appointment Booking** — Patients can browse doctor availability and book slots
- **Video Consultation** — Real-time telemedicine sessions with doctors
- **Digital Prescriptions** — Doctors issue prescriptions after consultations
- **Medical Records** — Patients can upload and manage medical reports
- **Stripe Payments** — Consultation fee collection and payment tracking
- **Doctor Reviews** — Patients can rate and review doctors post-appointment
- **Role-Based Access** — Super Admin, Admin, Doctor, and Patient roles
- **Caching** — Redis caching for doctor listings and availability data
- **Security** — Helmet, CORS, rate limiting, Zod input validation

---

## 👥 User Roles

| Role | Access Level |
|---|---|
| Super Admin | Full system access, manage all entities |
| Admin | Manage doctors, patients, view reports |
| Doctor | Manage appointments, write prescriptions, view patient data |
| Patient | Book appointments, view prescriptions, upload medical reports |

---

## 🔄 Appointment Lifecycle

```
Patient Login → Browse Doctors → Book Appointment → Payment
→ Video Consultation with Doctor → Prescription Issued
→ Session Ends → Patient Submits Review
```

---