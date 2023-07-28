import { gql } from "apollo-server-express";
import { Context } from "../../../helpers/graphql/context";
import { UserModel } from "../../user/user.model";

export default {
  schema: gql`
    extend type Mutation {
      regisDeviceToken(token:String!): String
    }
  `,
  resolvers: {
    Mutation: {
      regisDeviceToken: async (root: any, args: any, context: Context) => {
          context.auth(["ADMIN","USER"]);
          const {token} = args;

          // update device token to. user
          await UserModel.updateOne({
            _id:context.userId
          },{
            $addToSet:{deviceTokens:token}
          })

          // remove device token from another user if it duplicate
          
      }
    },
  },
};
