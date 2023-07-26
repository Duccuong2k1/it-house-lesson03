import { gql } from "apollo-server-express";
import { Context } from "../../../helpers/graphql/context";
import { ProductLikeModel } from "./productLike.model";
import { Product } from "../product.model";
import DataLoader from "dataloader";
import { Types } from "mongoose";
import _ from "lodash";

export default {
  schema: gql`
    extend type Mutation {
      likeProduct(productId: ID!): Boolean
    }
    extend type Product {
      like: Int
    }
  `,
  resolvers: {
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


const ProductLikeLoader = new DataLoader<string , number>(async(ids)=>{
  const objectIds = ids.map((id)=> new Types.ObjectId(id));
  return await ProductLikeModel.aggregate([
    {$match:{productId :{$in:objectIds}}},
    {$group:{_id:"$productId",count:{$sum:1} }}
  ]).then((res)=>{
    const keyById = _.keyBy(res,"_id");
    return ids.map((id)=> _.get(keyById,``))
  })
})