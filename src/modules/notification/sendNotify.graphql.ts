import { gql } from "apollo-server-express";
import { Context } from "../../helpers/graphql/context";
import { UserLoader } from "../user/user.model";
import { NotificationModel } from "./notification.model";




export default {
  schema: gql`
    extend type Mutation {
      sendNotify(data:SendNotifyInput!):String
    }

    input SendNotifyInput{
      sendTo:ID!
      title: String!
      body: String!
      image: String
      action: ActionNotifyInput
    }
  `,
  resolvers: {
    Mutation: {
      sendNotify: async (root: any, args: any, context: Context) => {
          context.auth(["ADMIN","USER"]);
          const {sendTo,title,body,image,action} = args.data;
          const user = await UserLoader.load(sendTo);

          if(!user){
            throw new Error("User not found");
          }
          // create notify
          const notification = await NotificationModel.create({
            userId:user._id,
            title:title,
            body:body,
            image:image,
            read:false,
            action:action,
          })
          return "ok"
      }
    },
  },
};
