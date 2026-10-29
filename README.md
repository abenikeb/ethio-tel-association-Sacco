# Ethio Telecom Association SACCO

Monorepo for the SACCO system. Each app lives under `apps/` and is installed and run on its own.

| App         | Path              | Purpose                                                                 | Package manager | Dev port                  |
| ----------- | ----------------- | ----------------------------------------------------------------------- | --------------- | ------------------------- |
| Backend API | `apps/backend`    | Node/TypeScript API with Prisma and sockets                             | npm             | set in the backend `.env` |
| Frontend    | `apps/frontend`   | Member and staff web app (Next.js)                                      | npm             | 3000                      |
| Admin       | `apps/admin`      | Admin dashboard (Next.js)                                               | npm             | 3001                      |
| Superadmin  | `apps/superadmin` | Superadmin console (Next.js)                                            | npm             | 3002                      |
| Portal      | `apps/portal`     | Customer booking/customer self portal portal for the service (Next.js)` | pnpm            | 3003                      |

## Requirements

- Node.js 18.18 or newer
- npm, plus [pnpm](https://pnpm.io) for the portal
- A database supported by the Prisma schema in `apps/backend/prisma`

## Getting started

```bash
# install everything
npm run install:all

# backend: copy the env file, then fill in values
cp apps/backend/.env.example apps/backend/.env
npx --prefix apps/backend prisma migrate dev

# run the apps you need, each in its own terminal
npm run dev:backend
npm run dev:frontend
npm run dev:admin
npm run dev:superadmin
npm run dev:portal
```

Each app has its own `.env`. Never commit real `.env` files; add a `.env.example` for any new variable.

## Repository layout

```
apps/
  backend/      API, Prisma schema and migrations
  frontend/     member and staff app
  admin/        admin dashboard
  superadmin/   superadmin console
  portal/       booking portal
```

## Notes

- The root `package.json` only holds helper scripts. It does not use workspaces because the portal uses pnpm and the other apps use npm.
- `apps/portal` was merged with `git subtree`, so its original history is preserved.
- Uploaded files, member documents and generated loan agreements under `apps/backend` are ignored by Git. Do not commit them.

## Branches

- `master`: main branch
- `dev`: development branch
