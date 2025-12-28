import type { Handle } from "@sveltejs/kit";

function extractLanguageFromURL(url: string): string {
  const langMatch = url.match(/(?<=:\/\/)[^/]+\/([^/]+)/);
  return langMatch ? langMatch[1] : "en";
}

export const handle: Handle = async ({ event, resolve }) => {
  const lang = extractLanguageFromURL(event.request.url.toString());

  const url = new URL(event.request.url);
  const ref = url.searchParams.get('ref');
  if (ref && event.cookies.get('ref') !== ref) {
    event.cookies.set(
      'ref', 
      ref, 
      { 
        path: '/', 
        maxAge: 3600 * 24 * 30, 
        httpOnly: false
      }
    );
  }

  // Check if cookie consent is already given
  const cookieConsent = event.cookies.get('cookieConsent');
  if (!cookieConsent) {
    // If not, set a default value (false) or handle accordingly
    event.cookies.set(
      'cookieConsent', 
      'false', 
      { 
        path: '/', 
        maxAge: 3600 * 24 * 365, 
        httpOnly: false
      }
    );
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang)
  });
};

