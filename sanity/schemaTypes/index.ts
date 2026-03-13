import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { post } from './post'
import { like } from './like'
import { comment } from './comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, post, like, comment],
}
