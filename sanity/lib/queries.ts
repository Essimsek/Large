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

export const GET_POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug && author->username == $username][0] {
  title,
  description,
  category,
  image,
  likes,
  views,
  _createdAt,
  _updatedAt,
  pitch
}`

export const GET_USER_BY_USERNAME_QUERY = `*[_type == "author" && username == $username][0]`

export const GET_USER_POSTS_QUERY = `*[_type == "post" && author->username == $username] | order(_createdAt desc) {
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
}`