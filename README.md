# Groupomania — Social Feed App

Summary

- What it is: Groupomania is a small social feed application with a React frontend and an Express + PostgreSQL backend. Users can sign in, publish posts (with optional media), and view a feed of posts and uploaded media.
- Purpose: Built as a full-stack project to demonstrate CRUD operations, file uploads, authentication tokens, and state management using React context + reducer.

High-level architecture

- Frontend: React (JSX) in `src/`.
  - `src/App.jsx` — app root: provides `AuthContext` and mounts `components/page.jsx`.
  - `src/context.js` — global state (reducer + initialState).
  - `src/components/` — UI components: `PublishPost.jsx`, `PublishMedia.jsx`, `Feed.jsx`, `Post.jsx`, etc.
  - Styling: `src/App.css` + Bootstrap (imported in `src/index.js`).

- Backend: Express server in `server/`.
  - `server/server.js` — starts Express, mounts routes and serves static assets from `public/`.
  - `server/routes/*.js` — route declarations for users, posts and media.
  - `server/controllers/*.js` — database interaction using `pg` Pool.
  - `server/middleware/` — helpers such as `authorize.js` and `upload.js` (file-storage and auth token checks).

- Database: PostgreSQL. SQL files are in `queries/` for schema and helper queries.

How it works (request flow)

- Client obtains an auth token after signing in (stored in localStorage).
- Publishing a post: `PublishPost.jsx` builds a FormData payload (user_id, title, content, optional file) and POSTs to `/addPost`.
- Server receives request, middleware handles file upload (if present), controller inserts rows into `posts` and `media` tables.
- Feed refresh: frontend calls `/getPosts` which returns joined rows (post content + user email) ordered by created time.

How to run (developer quick steps)

1. Install dependencies (frontend + backend use the same package.json):

```bash
npm install
```

2. Environment: create a `.env` file at the project root with DB and server variables. Minimal example:

```env
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_PORT=5432
PORT=8760
JWT_SECRET=your_jwt_secret
```

3. Start the server in development (from project root):

```bash
npm run devb
```

4. Start the frontend in parallel:

```bash
npm run devf
```

improvements for the future 

- Add input sanitization & server-side validation for injected content.
- Add unit tests for reducers and API endpoints (supertest + jest).
- Use environment-specific start scripts and a `Procfile`/docker configuration for consistent deployment.

Files you may want to inspect during an interview

- `src/components/PublishPost.jsx` — shows FormData usage and client-side validation.
- `server/controllers/post.js` — DB queries and sequence sync logic.
- `server/middleware/authorize.js` — token handling logic.

Contact

If you want further polishing (refactor components to TypeScript, add tests, or prepare a demo script), tell me which area to prioritize and I will implement it.

