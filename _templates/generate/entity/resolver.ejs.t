---
to: src/modules/<%= h.inflection.camelize(name,true) %>/<%= h.inflection.camelize(name, true) %>.resolver.ts

---


import { Context } from "../../helpers/graphql/context";

import { <%= h.inflection.camelize(name,true) %>Service } from "./<%= h.inflection.camelize(name, true) %>.service";

export default {
  Query: {
    getAll<%= h.inflection.camelize(name) %>: async (root: any, args: any, context: Context) => {

      const {q} = args;
      return await <%= h.inflection.camelize(name,true) %>Service.fetch(q)
    },

    getOne<%= h.inflection.camelize(name) %>: async (root: any, args: any, context: any) => {
      const { id } = args;
     return await <%= h.inflection.camelize(name, true) %>Service.findById(id)
    },
  },

  Mutation: {
    create<%= h.inflection.camelize(name) %>: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"])

      const { data } = args;
      const <%= h.inflection.camelize(name, true) %> = await <%= h.inflection.camelize(name, true) %>Service.create(data);

      return <%= h.inflection.camelize(name, true) %>;
    },

    update<%= h.inflection.camelize(name) %>: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"])

      const { id, data } = args;
    

      return await <%= h.inflection.camelize(name, true) %>Service.update(id,data);
    },
    delete<%= h.inflection.camelize(name) %>: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"])

      const {id} = args;
      
      return await <%= h.inflection.camelize(name, true) %>Service.delete(id);
    },
  },
};

