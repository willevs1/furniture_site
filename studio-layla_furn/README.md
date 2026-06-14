# Sanity Studio (scaffold)

This folder is a minimal scaffold for a Sanity Studio that will live alongside your Next.js app.

Why this scaffold
- The Sanity CLI typically requires an interactive login. If you prefer not to run the interactive `npm create sanity` on this machine, this scaffold provides the files needed to finish setup locally.

Quick start (run from the parent folder):

1. Install dependencies inside the studio folder:

```bash
cd studio-layla_furn
npm install
```

2. Run the Studio locally (this will prompt you to log in with Sanity when required):

```bash
npm run dev
```

3. If you want to link the Studio to the Sanity hosted project ID and dataset (already present in `sanity.config.ts`), log in when prompted by the CLI and complete any missing steps.

Files added
- `sanity.config.ts` — minimal Sanity config (projectId `9e742a80`, dataset `production`).
- `schemas/product.ts` — example product schema.
- `schemas/schema.ts` — schema export used by the config.
- `AGENT_PROMPT.txt` — the agent prompt you asked to be copied here.
- `package.json` — minimal scripts for `dev`, `build`, and `deploy`.

Next steps I can take for you
- Wire the Next.js app to read/write to Sanity (upsert API route + image upload) — requires a Sanity write token.
- Migrate existing `src/data/products.json` into Sanity documents (I can do this after you confirm and provide a write token or complete the Studio setup locally).

If you want me to proceed and attempt to run the CLI here, let me know — note the CLI requires an interactive login and cannot complete non-interactively from this environment.
