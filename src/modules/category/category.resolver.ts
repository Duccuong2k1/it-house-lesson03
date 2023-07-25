
import { Category } from "./category.model";
import { Context } from "../../helpers/graphql/context";

import { categoryService } from "./category.service";
import _ from "lodash";
import { ProductLoader, ProductModel } from "../product/product.model";
import { GraphqlServer } from "../../helpers/graphql/resolver";

export default {
  Query: {
    getAllCategory: async (root: any, args: any, context: Context) => {
      const { q } = args;
      if (!context.isAdmin) {
        _.set(args, "q.filter.active", true);
      }
      return await categoryService.fetch(q);
    },

    getOneCategory: async (root: any, args: any, context: any) => {
      const { id } = args;
      return await categoryService.findById(id);
    },
  },

  Mutation: {
    createCategory: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]);

      const { data } = args;
      const category = await categoryService.create(data);

      return category;
    },

    updateCategory: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]);

      const { id, data } = args;

      return await categoryService.update(id, data);
    },
    deleteCategory: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]);

      const { id } = args;

      return await categoryService.delete(id);
    },
  },
  Category: {
    products: GraphqlServer.loadMany(ProductLoader,"productIds")
  },
};
