---
title: Zeno Tekk Backend
emoji: "🚀"
colorFrom: blue
colorTo: indigo
sdk: docker
app_port: 7860
pinned: false
short_description: Express and TypeScript backend for Zeno Tekk.
---

# ZENO BACKEND

This README is prepared for a Hugging Face Docker Space deployment of the backend service.

Hugging Face reads the YAML block only from the root `README.md` of the Space repository. If you deploy this backend as its own Space repo, keep this file at the repo root. If you deploy the whole monorepo, copy the same front matter into the top-level `README.md`.

## Docker Space setup

This project is already aligned with Hugging Face Docker Spaces:

- The Docker image exposes port `7860`.
- The container sets `PORT=7860`.
- The server binds to `0.0.0.0`.
- The backend includes a health route at `/health`.

If this backend is published as a standalone Space repository, make sure the `Dockerfile` is also at the root of that repository. In the current monorepo, the `Dockerfile` lives at the top level and copies the `backend/` folder during build.

## Hugging Face Space variables

Add these in the Space `Settings` page under `Variables`:

| Name | Value | Required | Notes |
| --- | --- | --- | --- |
| `NODE_ENV` | `production` | Yes | Enables production cookie settings and production DB entity paths. |
| `PORT` | `7860` | Recommended | Matches the Docker Space port expected by Hugging Face. |
| `FRONTEND_URL` | Your frontend URL | Recommended | Used in email links such as login and password reset flows. |

## Hugging Face Space secrets

Add these in the Space `Settings` page under `Secrets`:

| Name | Required | Notes |
| --- | --- | --- |
| `DB_URL` | Yes, unless `DATABASE_URL` is set instead | PostgreSQL connection string used by TypeORM and session storage. |
| `DATABASE_URL` | Yes, unless `DB_URL` is set instead | Alternate PostgreSQL connection string name supported by the backend. |
| `JWT_SECRET` | Yes | Secret used for sessions and JWT signing. |
| `GMAIL_USER` | If email flows are enabled | Gmail account used for OTP and reset emails. |
| `GMAIL_PASSWORD` | If email flows are enabled | Gmail app password or mail credential for the account above. |
| `CLOUDINARY_CLOUD_NAME` | If uploads are enabled | Cloudinary cloud name for file storage. |
| `CLOUDINARY_API_KEY` | If uploads are enabled | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | If uploads are enabled | Cloudinary API secret. |

## Notes

- `JWT_EXPIRATION` exists in the local `.env`, but it is not currently used by the backend code.
- The backend accepts either `DB_URL` or `DATABASE_URL`. If neither is set, startup will fail immediately with a clear configuration error instead of falling back to `localhost:5432`.
- SSL is enabled automatically for non-local Postgres URLs and skipped for localhost or URLs that explicitly use `sslmode=disable`.
- Hugging Face Docker Space metadata is based on the official Spaces config reference and Docker Spaces docs.
