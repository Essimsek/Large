export const GET_ALL_POSTS_QUERY_DESC = `*[_type == 'post'] | order(_createdAt desc) {
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
      image
      },
  }`;
