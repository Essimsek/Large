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
