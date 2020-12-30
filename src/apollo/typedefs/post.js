import { gql } from 'apollo-server-lambda';

import { GraphQLObject } from '../types';
import { mapPost } from '../mappings';

export const postTypeDefs = gql`
  type Details {
    size: Int
    image: Object
  }

  type File {
    url: String
    details: Details
    filename: String
    type: String
  }

  type Asset {
    title: String
    file: File
  }

  type Post {
    id: ID!
    title: String!
    slug: String!
    image: Asset
    body: Object!
    video: String
  }

  extend type Query {
    posts: [Post!]!
    post(slug: String!): Post
  }
`;

export const postResolvers = {
  Object: GraphQLObject,
  Query: {
    posts: async (_, __, { dataSources: { contentfulAPI } }) => {
      const { items } = await contentfulAPI.getEntries('recipe');
      return items.map(mapPost);
    },
    post: async (_, { slug }, { dataSources: { contentfulAPI } }) => {
      const { items } = await contentfulAPI.getEntry('recipe', slug);
      const post = items.map(mapPost)[0];
      return post;
    }
  },
};
