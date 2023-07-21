---
to: src/modules/<%= h.inflection.camelize(name,true) %>/<%= h.inflection.camelize(name, true) %>.schema.ts

---

import { gql } from "apollo-server-express";


export default gql`
    

    extend type Query {
        getAll<%= h.inflection.camelize(name ) %>(q:QueryInput): <%= h.inflection.camelize(name) %>PageData
        getOne<%= h.inflection.camelize(name) %>(id:ID!): <%= h.inflection.camelize(name) %>
    }

  

    extend type Mutation {
        create<%= h.inflection.camelize(name ) %>(data: Create<%= h.inflection.camelize(name ) %>Input!): <%= h.inflection.camelize(name) %>
        update<%= h.inflection.camelize(name) %>(id: ID!, data: Update<%= h.inflection.camelize(name) %>Input!): <%= h.inflection.camelize(name) %>
        delete<%= h.inflection.camelize(name) %>(id: ID!): Boolean
    }

    type <%= h.inflection.camelize(name) %>PageData{
        data:[<%= h.inflection.camelize(name) %>]
        pagination:Pagination
    }
    type <%= h.inflection.camelize(name) %> {
        id:ID!
        createdAt:DateTime
        updatedAt:DateTime
        name:String!
       
    }


    input Create<%= h.inflection.camelize(name) %>Input {
        name:String
        
    }
    input Update<%= h.inflection.camelize(name) %>Input {
        name:String
       
    }
`;
