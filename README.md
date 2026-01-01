![Next-Redis](./public/next-redis.png)

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

## Local Access

This POC is designed to run **entirely in local development**.

### Application

- **App URL:** http://localhost:3000  
  Main Next.js application (App Router).

### Redis Insight

- **Redis Insight URL:** http://localhost:5540

Redis Insight is a **local UI tool** to inspect and debug Redis data
(keys, TTL, values, memory usage, etc.).

At first launch:

1. Open Redis Insight
2. Create a new database
3. Configuration:
    - **Host:** `redis`
    - **Port:** `6379`
    - **Username:** `default`
    - **Password:** `______` (empty)
4. Save and connect

No security is applied here — again, this setup is **strictly local**, for development
and inspection purposes only.

---

## High-Level Architecture

```
Browser
|
|  (httpOnly cookie: session id)
v
Next.js Server (1..n instances)
|
|  Redis lookup by session id
v
Redis (session store)
```

- The browser never stores session data directly
- All sensitive data lives on the server
- Redis is treated as a **single logical session store**
- Client only receives a **safe, minimal view** of the session

---

## Session Model (Server)

Redis stores **only essential session data**, for example:

- `sessionId` (key)
- `userId`
- authentication state
- access scopes / permissions
- regulatory flags (blocking, limits, etc.)
- timestamps (`issuedAt`, `expiresAt`, `lastSeenAt`)

**Large or sensitive domain data are not trusted from the client and are fetched separately when needed.**

---

## Client Session Exposure

The React **Session Context Provider** receives a **sanitized, UI-safe object** only.

Example:

```ts
{
  username: "DarioLopes"
  age: 34,
  country: "Portugal"
  preferences: {
    // any false preference (offers, newsletters, updates)
    // is simply removed from the preferences object, not set to false.
    offers: true,
    newsletters: true,
    updates: true
  }
}
```

## Client Session Exposure

The client only receives a **sanitized, UI-safe representation** of the session.

This data is:

- derived **server-side**
- hydrated **once at the layout level**
- used **strictly for UI logic** (visibility, labels, navigation)
- never treated as a source of truth for security-sensitive decisions

---

## Flow Overview

### 1. Initial Request

- The browser sends a request containing a `sessionId` http-only cookie
- A Next.js server instance reads the session from Redis
- The session is validated (expiration, flags, permissions)

### 2. Layout Hydration

- The layout calls a Server Action to read the session
- A **cleaned session object** is generated server-side
- This object is passed to the client `SessionProvider`

### 3. Client Usage

- Components consume session state via `useSession()`
- No client-side persistence or trust is assumed
- No sensitive data is kept in browser memory beyond what is explicitly rendered

### 4. Updates (Login / Logout / Mutation)

- Server Actions update the session in Redis
- The client may refresh its session state via Server Actions
- No manual page reload is required

---

## Redis Considerations

- Sessions can be centrally invalidated at any time on frontend side
- A single Redis instance can easily handle thousands of sessions
- TTL is enforced on all session keys
- Redis is never exposed to the browser

---

## Important Notes

- This project is a **POC focused on architectural validation**
- Security hardening, monitoring, auditing, scaling and compliance are intentionally out of scope
- The design prioritizes:
    - clarity over abstraction
    - server authority over client trust
    - explicit data ownership boundaries

---

## Non-Goals

- No JWT-based authentication
- No OAuth or third-party identity providers
- No persistent client storage (`localStorage`, `sessionStorage`)
- No advanced Redis clustering or sharding (for now)

---

## Purpose

This project exists to:

- test session handling with the App Router
- explore Server Actions for authentication flows
- validate Redis as a centralized session store
- reason about client/server responsibility boundaries

Nothing more... yet :D
