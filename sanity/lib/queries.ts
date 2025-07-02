export const GET_ALL_POSTS_QUERY_DESC = `
  *[
    _type == "post" &&
    defined(slug.current) &&
    (
      !defined($search) ||
      category match $search ||
      title match $search ||
      description match $search ||
      author->username match $search ||
      author->name match $search
    )
  ] | order(_createdAt desc) {
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    category,
    description,
    image,
    likes,
    views,
    "author": author -> {
      _id,
      username,
      name,
      image
    },
  }
`;