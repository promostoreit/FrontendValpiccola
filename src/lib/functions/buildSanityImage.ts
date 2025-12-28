import { sanity } from '$lib/sanity';
import imageUrlBuilder from '@sanity/image-url';

const imgBuilder = imageUrlBuilder(sanity);

export function buildSanityImage(source) {
  return imgBuilder.image(source);
}
