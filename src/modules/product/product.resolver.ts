import _ from "lodash";
import { Context } from "../../helpers/graphql/context";

import { productService } from "./product.service";

export default {
  Query: {
    getAllProduct: async (root: any, args: any, context: Context) => {

      const {q} = args;
      // check if don't have permission admin then only show product status active true
      if(!context.isAdmin){
        _.set(args,"q.filter.active",true);
      }
      return await productService.fetch(q)
    },

    getOneProduct: async (root: any, args: any, context: any) => {
      const { id } = args;
     return await productService.findById(id)
    },
  },

  Mutation: {
    createProduct: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"])

      const { data } = args;
      // if(!data.code){
      //   data.code = await productService.generateCode()
      // }
      const product = await productService.create(data);

      return product;
    },

    updateProduct: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"])

      const { id, data } = args;
    

      return await productService.update(id,data);
    },
    deleteProduct: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"])

      const {id} = args;
      
      return await productService.delete(id);
    },
  },
};

