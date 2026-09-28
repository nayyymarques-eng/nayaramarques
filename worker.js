// The old address (nayaramarques.nayara-marques.workers.dev) went out in job applications while the domain was stuck.
// Keep those links working: send each one to the same page on nayaramarques.com. Everything else (PR previews,
// the custom domains once they point here) is served from the static files as before.
const OLD_HOST = 'nayaramarques.nayara-marques.workers.dev';
const DOMAIN = 'https://nayaramarques.com';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === OLD_HOST) {
      return Response.redirect(DOMAIN + url.pathname + url.search, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
