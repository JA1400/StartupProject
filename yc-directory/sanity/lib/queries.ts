import { defineQuery } from "next-sanity";

export const STARTUP_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search  || title match $search || author -> name match $search] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  image,
  author -> {_id, name, image, bio},
  description,
  views,
  category
}`);

export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
  title,
  slug,
  _createdAt,
  image,
  'author': author -> {_id, name, username, image, bio},
  description,
  views,
  category,
  pitch
}`);

export const STARTUP_VIEWS_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id] [0] {
  _id,
  views
}`);

export const AUTHOR_BY_GITHUB_ID_QUERY =
  defineQuery(`*[_type == "author" && _id == $id] [0] {
  _id,
  id,
  name,
  username,
  email,
  image,
  bio    
  }`);
