# Client website template

A starting point for one client website built by Local Cascade. Each client gets their own copy
of this repo on GitHub, deployed by Vercel from the `main` branch.

Open the client's copy in Claude Code and say what you want. Claude reads `CLAUDE.md`, works on a
branch, opens a pull request, gives you the Vercel preview link, and puts it live when you say
"ship it". The review address is the `preview_url` in `site.json` (`https://<project>.vercel.app`)
until the client's own domain is connected at go-live.

To start a new client: copy this template into a new repo, import that repo into Vercel as a new
project (no framework, no build command, output directory `public`; `vercel.json` already sets
this), and fill in `vercel_project` and `preview_url` in `site.json`.

Do not edit this template to fix one client's site; fix it in that client's repo.

## This client: Wilkerson Consulting (build notes for the team)

Built from the gbk4.5 kit (`MASTER-PROMPT.md`, `BRIEF.md`, `CLAUDE.md`) plus the client add-ons, as a
Strain Systems accounting and consulting site (not a law firm). `VERIFY.md` is the list for the client.

- **Hosting:** static Vercel site, output directory `public`, no build step. `vercel.json` sends
  `X-Robots-Tag: noindex` on every `*.vercel.app` host, so previews never get indexed. `robots.txt`
  allows search engines and AI crawlers and lists the sitemap, ready for the live domain.
- **Still to fill in `site.json`:** `vercel_project` and `preview_url` (no Vercel project was created),
  and `integrations.review_link` (the client has no Google Business Profile yet, so there is no review
  button; the one `check.mjs` WARN is this).
- **GoHighLevel:** the form embed (inline, in a `#contact` section on every page) and the chat widget
  (once per page, before `</body>`) are character for character as supplied. Their hosts were blocked
  in the build environment, so on the first Vercel preview check that the form renders and submits,
  and that the chat bubble sits level with the two round phone buttons. Those are 56px, 20px from the
  bottom (`--fab` and `--fab-bottom` in `site.css`); adjust if the bubble differs.
- **Small phones:** the GHL form is 543px tall by its own setting. On a short screen that is more
  than the space between the header and the round buttons, so Contact us lands with the top of the
  form just under the header.
- **Opening animation:** plays once per browser tab session (sessionStorage), can be skipped by any
  click, tap or key, hides itself by CSS after about 2.3s, and never runs with reduced motion or
  without JavaScript.
- **Editing:** pages were generated once and are now plain HTML. Edit them directly. The header and
  footer blocks must stay identical on every page (`node tools/check.mjs` enforces it).
- **Private material not in this repo:** the onboarding CSV, the client's emails and letters, and the
  add-ons file (it holds the home street address). Keep them out; this repo is public.
