import { ApolloServer } from 'apollo-server-lambda';

import ContentfulAPI from '../apollo/datasourses/contentful';
import { schema } from '../apollo/schema';

const apolloServer = new ApolloServer({
  schema,
  dataSources: () => ({
    contentfulAPI: new ContentfulAPI(),
  }),
  context: async () => {
    const {
      CONTENTFUL_DELIVERY_ACCESS_TOKEN,
      CONTENTFUL_SPACE_ID,
    } = process.env;

    return {
      contentful_space_id: CONTENTFUL_SPACE_ID,
      contentful_access_token: CONTENTFUL_DELIVERY_ACCESS_TOKEN,
    };
  },
  playground: {
    endpoint: '/dev/graphql',
  },
});

export const graphqlHandler = apolloServer.createHandler();
