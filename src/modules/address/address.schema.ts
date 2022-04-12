import { gql } from 'apollo-server-express';
export default gql`
    extend type Query {
        
        getDistrict(provinceId:ID!):[District]
        getWarn(districtId:ID!):[Warn]
    }
    
    type District {
        id:ID!
        name:String!
    }
    type Warn {
        id:ID!
        name:String!
    }

`