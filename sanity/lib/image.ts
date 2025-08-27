import createImageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = createImageUrlBuilder(client);

export function urlForImage(source: any) {
  return builder.image(source);
}

export async function uploadImageFromUrl(url: any) {
  const response = await fetch(url)
  const blob = await response.blob()
  const file = new File([blob], "remote-image.jpg", { type: blob.type })

  const asset = await client.assets.upload("image", file, {
    filename: "remote-image.jpg",
  })

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  }
}
