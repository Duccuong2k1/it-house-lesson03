
import _ from "lodash";
import { Context } from "../../helpers/graphql/context";

import { productService } from "./product.service";
import { CategoryModel } from "../category/category.model";


export default {
  Query: {
    getAllProduct: async (root: any, args: any, context: Context) => {
      const { q } = args;
      // check if don't have permission admin then only show product status active true
      if (!context.isAdmin) {
        _.set(args, "q.filter.active", true);
      }
      return await productService.fetch(q);
    },

    getOneProduct: async (root: any, args: any, context: any) => {
      const { id } = args;

      const product = await productService.findById(id);
      //  count view product if view increase
      //  if want to decrease then view : -1
      product.updateOne({ $inc: { view: 1 } }).exec();
      return product;
    },
  },

  Mutation: {
    createProduct: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]);

      const { data } = args;
      // if(!data.code){
      //   data.code = await productService.generateCode()
      // }
      const product = await productService.create(data);

      return product;
    },

    updateProduct: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]);

      const { id, data } = args;

      return await productService.update(id, data);
    },
    deleteProduct: async (root: any, args: any, context: any) => {
      context.auth(["ADMIN"]);

      const { id } = args;

      return await productService.delete(id);
    },
  },
  Product: {
    category: async (root: any, args: any, context: any) => {
      const { categoryId } = root;
      return await CategoryModel.findById(categoryId);
    },
  },
};
