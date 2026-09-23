---
description: Check the site, commit, push to main (Netlify deploys from the push), confirm it is live
argument-hint: [short description of the change]
---

Deploy the site. Change description: $ARGUMENTS

1. Run `git status`. If nothing changed, say so and stop.
2. Checks on the changed `.html` files (report, and stop if any fail unless I say go):
   - No prices: every offer says "Priced on the call". Flag "fixed price" and currency amounts in offer copy. Budget ranges in the `start-a-project` form and figures inside case-study mockups are fine.
   - One job title and level: flag any title that differs from the one on `index.html`.
   - Links: every local `href`/`src` in the changed files points to a file that exists.
3. Show me the list of changed files and a one-line summary of each change.
4. Commit with a short message (use the change description if given) and push to `origin main`. Cloudflare Workers Builds deploys the push (config in `wrangler.jsonc`).
5. Wait about a minute, then fetch one changed page on https://nayaramarques.nayara-marques.workers.dev and confirm the change is live. Once the domain points to Cloudflare, check https://www.nayaramarques.com too. If it is not live, say so; do not retry the push.

Never touch Cloudflare or Netlify settings, or DNS, from this command.
