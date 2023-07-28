import _ from "lodash";
import { Context } from "../../helpers/graphql/context";

import { orderService } from "./order.service";
import { GraphqlServer } from "../../helpers/graphql/resolver";
import { UserLoader } from "../user/user.model";

export default {
  Query: {
    getAllOrder: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN","USER"]);
      if(!context.isAdmin){
        _.set(args,"q.filter.buyerId",context.userId)
      }
      const {q} = args;
      return await orderService.fetch(q)
    },

    getOneOrder: async (root: any, args: any, context: any) => {
      const { id } = args;
     return await orderService.findById(id)
    },
  },

  Mutation: {
    createOrder: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN","USER"])

      const { data } = args;
      const order = await orderService.create(data);

      return order;
    },

    updateOrder: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN","USER"])

      const { id, data } = args;
    

      return await orderService.update(id,data);
    },
    deleteOrder: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN","USER"])

      const {id} = args;
      
      return await orderService.delete(id);
    },
  },
  Order:{
    buyer:GraphqlServer.load(UserLoader,"buyerId")
  }
};

