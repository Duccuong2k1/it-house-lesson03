---
to: src/modules/<%= h.inflection.camelize(name,true) %>/<%= h.inflection.camelize(name, true) %>.graphql.ts

---
import { gql } from "apollo-server-express";
import { Context } from "<%= h.import(name, '../../helpers/graphql/context') %>";

export default {
  schema: gql`
    extend type Query {
      <%= h.inflection.camelize(name, true) %>: Mixed
    }
  `,
  resolver: {
    Query: {
      <%= h.inflection.camelize(name, true) %>: async (root: any, args: any, context: Context) => {
        
      }
    },
  },
};
