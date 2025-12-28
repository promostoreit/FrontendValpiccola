import { createClient } from '@sanity/client';
import { PUBLIC_SANITY_PROJECT_ID } from "$env/static/public";

export const sanity = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false
});
