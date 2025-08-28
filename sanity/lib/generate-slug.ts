import { client } from "./client";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .substring(0, 200);
}

export async function checkExistingSlug(title: string): Promise<string> {
  let count = 0;
  let baseSlug = generateSlug(title);
  let slug = baseSlug;

  let existingPost = await client.withConfig({ useCdn: false }).fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
  );

  while (existingPost) {
    count++;
    slug = `${baseSlug}-${count}`;

    existingPost = await client.withConfig({ useCdn: false }).fetch(
      `*[_type == "post" && slug.current == $slug][0]`,
      { slug }
    );
  }

  return slug;
}