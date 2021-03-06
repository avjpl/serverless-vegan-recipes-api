import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  directive @date(
    defaultFormat: String = "Do MMMM YYYY"
  ) on FIELD_DEFINITION

  scalar Date
  scalar Object

  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export default typeDefs;
