# Ethio Telecom Association SACCO

A digital platform for running the Ethio Telecom Association Savings and Credit Cooperative (SACCO): member records, savings, loans, withdrawals, accounting and reporting, plus a customer portal for the association's booking service. All applications live in this single repository under `apps/`, and each one is installed and run on its own.

## About the business

### What a SACCO is

A SACCO (Savings and Credit Cooperative Organization) is a member-owned financial cooperative. Members pool their savings, and the pool is lent back to members at affordable rates. Because the members are also the owners, surpluses are shared with members instead of being paid out to outside shareholders. This model is common across Africa, where it gives salaried workers and small businesses access to savings and credit that conventional banks often serve poorly.

### Where this SACCO fits

This SACCO serves the Ethio Telecom Association community. Members are typically employees who save regularly, often through salary deduction, and who borrow against those savings when they need money for housing, education, emergencies, or business. In Ethiopia, cooperatives like this are an established part of the financial sector, and they usually answer to their own members' general assembly and to the cooperative regulator.

### How the cooperative operates

1. **Membership.** A person applies, supplies identity documents (KYC), and is approved by the committee. Members agree to the terms and conditions.
2. **Savings.** Members make regular contributions. They can also make voluntary ("willing") deposits on top of the required amount.
3. **Loans.** Members apply for a loan product. The request goes through an approval chain, such as a loan officer and a committee, and a loan agreement is produced. After approval the loan is disbursed and repaid in instalments, often by salary deduction.
4. **Withdrawals.** Members request withdrawals, which are reviewed and approved before payout.
5. **Accounting.** Every transaction is recorded in a double-entry ledger, which produces the trial balance, income statement and balance sheet used for audits and reports to the members.
6. **Governance and reporting.** Management and the committee track member growth, savings trends, loan performance and delinquency, and keep an audit trail of who changed what.

### What this software does

| Area | Capabilities |
|---|---|
| Members | Registration, KYC documents, membership requests, member profile and statements |
| Savings | Regular savings, willing deposits, deposit requests and history |
| Loans | Loan products, calculator, applications, multi-step approval, agreement documents, disbursement, repayment tracking |
| Withdrawals | Member requests and approval workflow |
| Accounting | Chart of accounts, journal entries, general ledger, trial balance, income statement, balance sheet |
| Reports and analytics | Financial performance, loan performance, delinquency, member growth, savings trends |
| Administration | Roles and permissions, user management, system settings, audit logs, notifications |

## Applications

| App         | Path              | Purpose                                                              | Package manager | Dev port                  |
| ----------- | ----------------- | -------------------------------------------------------------------- | --------------- | ------------------------- |
| Backend API | `apps/backend`    | Node/TypeScript API with Prisma, sockets and the business rules      | npm             | set in the backend `.env` |
| Frontend    | `apps/frontend`   | Member and staff web app (Next.js)                                   | npm             | 3000                      |
| Admin       | `apps/admin`      | Admin dashboard (Next.js)                                            | npm             | 3001                      |
| Superadmin  | `apps/superadmin` | Superadmin console (Next.js)                                         | npm             | 3002                      |
| Portal      | `apps/portal`     | Customer booking and self-service portal for the service (Next.js)   | pnpm            | 3003                      |

## Requirements

- Node.js 18.18 or newer
- npm, plus [pnpm](https://pnpm.io) for the portal
- A database supported by the Prisma schema in `apps/backend/prisma`
- Docker and Docker Compose (optional, for the containerised setup)

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

## Running with Docker

```bash
cp .env.example .env      # fill in the values
docker compose up --build
```

The apps are then available on ports 3000 to 3003 and the API on port 5000.

## CI/CD

GitHub Actions workflows live in `.github/workflows`:

- `ci.yml` installs, lints, tests and builds every app on pull requests and on pushes to `master` and `dev`.
- `cd.yml` builds Docker images on pushes to `master`, publishes them to GitHub Container Registry, and can deploy to a server over SSH.

## Repository layout

```
apps/
  backend/      API, Prisma schema and migrations
  frontend/     member and staff app
  admin/        admin dashboard
  superadmin/   superadmin console
  portal/       booking and self-service portal
docker/         Dockerfiles
.github/        CI/CD workflows
```

## Notes

- The root `package.json` only holds helper scripts. It does not use workspaces because the portal uses pnpm and the other apps use npm.
- `apps/portal` was merged with `git subtree`, so its original history is preserved.
- Uploaded files, member documents and generated loan agreements under `apps/backend` are ignored by Git. They contain personal data and must not be committed.

## Branches

- `master`: main branch
- `dev`: development branch
