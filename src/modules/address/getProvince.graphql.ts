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
        Query: {
            getProvince: async (root: any, args: any, context: any) => {
                return [{
                    id: 1,
                    name: 'Hà nội'
                }]
            },
        },
        Province: {
            createAt: () => new Date().toISOString(),
        }
    }
}

