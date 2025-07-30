import createImageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = createImageUrlBuilder(client);

export function urlForImage(source: any) {
  return builder.image(source);
}