import { gql } from 'apollo-server-express';
export default gql`
    extend type Query {
        getAllProduct: [Product]
    }
    type Product {
        id: ID!
        name: String!
    }
`