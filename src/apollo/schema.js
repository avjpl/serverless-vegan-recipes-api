import { makeExecutableSchema } from 'apollo-server-lambda';
import { merge } from 'lodash';

import schemaDirectives from './directives';
import typeDefs from './typedefs/typeDefs';
import { postTypeDefs, postResolvers } from './typedefs/post';

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, postTypeDefs],
  resolvers: [merge(postResolvers)],
  schemaDirectives,
});
