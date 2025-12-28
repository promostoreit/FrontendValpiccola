import { sanity } from '$lib/sanity';

// Base URL and utility functions
const baseUrl = 'https://www.valpiccola.com';

function normalizeSlug(slug) {
  if (!slug) return '/';
  return slug.startsWith('/') ? slug : `/${slug}`;
}

function getFullUrl(slug) {
  const normalizedSlug = normalizeSlug(slug);
  let new_url = new URL(normalizedSlug, baseUrl).toString();
  return decodeURIComponent(new_url);
}

// Document types to include in sitemap
const docTypes = ["page", "event"];

// Main function to fetch data and generate sitemap
export async function GET() {
  try {
    const data = await fetchDataFromSanity();
    const sitemapXml = createSitemapXml(data);
    return new Response(sitemapXml, {
      headers: { 'Content-Type': 'application/xml' }
    });
  } catch (error) {
    console.error(error);
    return new Response('An error occurred while processing your request.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Fetch data from Sanity CMS
async function fetchDataFromSanity() {
  const query = `
    *[_type in [${docTypes.map(type => `"${type}"`).join(", ")}] && isActive == true] {
      "translations": *[_type == "translation.metadata" && references(^._id)]
      .translations[].value->{
        title,
        slug,
        language
      }
    }`;
  return await sanity.fetch(query);
}

// Generate sitemap XML
const createSitemapXml = (sanity_data) => {
  let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
    'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  const parsedUrl = new Set();

  sanity_data.forEach(sanity_document => {
    // Find the canonical version (Italian version) first
    const canonicalTx = sanity_document.translations.find(tx => 
      tx && tx.language.toLowerCase() === 'it'
    );

    if (!canonicalTx) return;

    // Only process if we haven't seen this URL before
    if (!parsedUrl.has(canonicalTx.slug.current)) {
      parsedUrl.add(canonicalTx.slug.current);

      // Use the canonical (Italian) URL as the main URL
      const canonicalUrl = getFullUrl(canonicalTx.slug.current);
      
      sitemapXml += `  <url>\n    <loc>${canonicalUrl}</loc>\n`;

      // Add alternate language versions
      sanity_document.translations.forEach(tx => {
        if (!tx) return;
        const alternateUrl = getFullUrl(tx.slug.current);
        sitemapXml += `    <xhtml:link rel="alternate" hreflang="${tx.language.toLowerCase()}" ` +
          `href="${alternateUrl}"/>\n`;
      });

      // Add x-default hreflang pointing to Italian version
      sitemapXml += `    <xhtml:link rel="alternate" hreflang="x-default" ` +
        `href="${canonicalUrl}"/>\n`;

      sitemapXml += '  </url>\n';
    }
  });

  sitemapXml += '</urlset>';
  return sitemapXml;
}
