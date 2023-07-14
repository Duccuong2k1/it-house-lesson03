import { gql } from 'apollo-server-express';
export default {

    schema: gql`
        extend type Query {
            getProvince:[Province]
        }
        type Province {
            id:ID!
            name:String!
            createAt:DateTime
        }
    `,
    resolvers: {
        
    }
}

