import { gql } from "apollo-server-express";
import { Context } from "../../../helpers/graphql/context";
import { ProductLikeModel } from "./productLike.model";
import { Product } from "../product.model";

export default {
  schema: gql`
    extend type Mutation {
      likeProduct(productId: ID!): Boolean
    }
    extend type Product {
      like: Int
    }
  `,
  resolver: {
    Mutation: {
      likeProduct: async (root: any, args: any, context: Context) => {
        context.auth(["ADMIN", "USER"]);

        const { productId } = args;
        const userId = context.userId;

        const productLike = await ProductLikeModel.findOneAndUpdate(
          { productId, userId },
          { $set: { productId, userId } },
          { upsert: true, new: true }
        );
        
        return true;
      },
    },
    Product: {
      like: async (root: Product, args: any, context: Context) => {
        const likeCount = await ProductLikeModel.count({ productId: root._id });
        console.log("like count",likeCount);
        return likeCount;
      },
    },
  },
};
