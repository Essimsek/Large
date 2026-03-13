import { defineQuery } from "next-sanity";

export const GET_ALL_POSTS_QUERY_DESC = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    (
      !defined($search) ||
      category match $search ||
      title match $search ||
      description match $search ||
      author->username match $search ||
      author->_id match $search ||
      author->name match $search
    )
  ] | order(_createdAt desc) [$start...$end] {
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
`);

export const GET_POST_BY_SLUG_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug && author->username == $username][0] {
  _id,
  title,
  description,
  category,
  image,
  likes,
  author -> {
  username,
  name,
  image
  },
  views,
  _createdAt,
  _updatedAt,
  content
}`);

export const GET_USER_BY_USERNAME_QUERY = defineQuery(`*[_type == "author" && username == $username][0]`);

export const GET_AUTHOR_ID_BY_USERNAME_QUERY = defineQuery(`*[_type == "author" && username == $username][0] {
  _id,}`
);

export const GET_USER_POSTS_QUERY = defineQuery(`*[_type == "post" && author->username == $username] | order(_createdAt desc) {
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
}`);

export const GET_POST_FOR_EDIT_QUERY = `
  *[_type == "post" && author->username == $username && slug.current == $slug][0]{
    title,
    description,
    category,
    content,
    "slug": slug.current,
    image,
    "author": author -> {
    username
    },
    _id,
  }
`;

export const GET_IMAGE_REF_BY_ID = defineQuery(`*[_type == "post" && _id == $postId][0].image.asset._ref`);

export const CHECK_USER_LIKED_POST = defineQuery(
    `count(*[_type == "like" && author._ref == $authorId && post._ref == $postId]) > 0`
);

export const GET_COMMENTS_BY_POST = defineQuery(`
    *[_type == "comment" && post._ref == $postId] | order(_createdAt desc) {
        _id,
        _createdAt,
        text,
        "author": author -> {
            username,
            name,
            image
        }
    }
`);

export const GET_COMMENT_COUNT_BY_POST = defineQuery(
    `count(*[_type == "comment" && post._ref == $postId])`
);

export const GET_ALL_CATEGORIES = defineQuery(`
    array::unique(*[_type == "post" && defined(category) && defined(slug.current)].category)
`);

export const GET_POSTS_BY_CATEGORY = defineQuery(`
    *[_type == "post" && category == $category && defined(slug.current)] | order(_createdAt desc) [$start...$end] {
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
        }
    }
`);

export const GET_TOTAL_POSTS_BY_CATEGORY = defineQuery(`
    count(*[_type == "post" && category == $category && defined(slug.current)])
`);

export const GET_RELATED_POSTS = defineQuery(`
    *[_type == "post" && category == $category && _id != $postId && defined(slug.current)] | order(_createdAt desc) [0...3] {
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
        }
    }
`);

export const GET_LATEST_POSTS_FOR_RSS = defineQuery(`
    *[_type == "post" && defined(slug.current)] | order(_createdAt desc) [0...20] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        description,
        category,
        "authorUsername": author->username
    }
`);

// get total posts based on search query. yasssssss
export const GET_TOTAL_POSTS_COUNT = defineQuery(`
  count(*[
    _type == "post" &&
    defined(slug.current) &&
    (
      !defined($search) ||
      title match $search ||
      category match $search ||
      description match $search ||
      author->username match $search ||
      author->name match $search
    )
  ])
`);
