import _ from "lodash";
import { Context } from "../../helpers/graphql/context";

import { notificationService } from "./notification.service";

export default {
  Query: {
    getAllNotification: async (root: any, args: any, context: Context) => {
      context.auth(['ADMIN','USER']);
      const {q} = args;
      if(!context.isAdmin){
        // if don't is admin then user can get only user
        _.set(q,"filter.userId",context.userId);
      }
      return await notificationService.fetch(q)
    },

    getOneNotification: async (root: any, args: any, context: any) => {
      const { id } = args;
     return await notificationService.findById(id)
    },
  },

  
};

