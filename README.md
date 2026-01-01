# Next.js Session POC (Redis)

This project is a **proof of concept** demonstrating a session-based authentication and state management flow using **Next.js App Router** and **Redis**.

The goal is to validate:

- server-side session storage with Redis
- a minimal, secure session model
- controlled exposure of session data to the client
- compatibility with multiple Next.js instances

This is **not a production-ready system**, but a functional exploration of architecture choices.

---

## Stack

### Frontend

- **Next.js 16 (App Router)**
- **TypeScript**
- **Tailwind CSS**

### Backend / Infrastructure

- **Redis** (session store)
- **Server Actions** (no REST auth endpoints)
- **HTTP-only cookies** for session identification

---

## High-Level Architecture
