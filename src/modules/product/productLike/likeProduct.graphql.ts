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
      isLike:Boolean
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
        ProductLikeLoader.clear(productId);
        return true;
      },
    },
    Product: {
      like: async (root: Product, args: any, context: Context) => {
        // const likeCount = await ProductLikeModel.count({ productId: root._id });
        // console.log("like count", likeCount);
        // return likeCount;
        return await ProductLikeLoader.load(root._id.toString());
      },
      isLike: async (root: Product, args: any, context: Context) => {
        if (!context.isAuth) return false;
        return UserLikeProductLoader.load(`${root._id}-${context.userId}`);
      },
    },
  },
};

const ProductLikeLoader = new DataLoader<string, number>(
  async (ids) => {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    return await ProductLikeModel.aggregate([
      { $match: { productId: { $in: objectIds } } },
      { $group: { _id: "$productId", count: { $sum: 1 } } },
    ]).then((res) => {
      const keyById = _.keyBy(res, "_id");
      return ids.map((id) => _.get(keyById, ``));
    });
  },
  { cache: true }
);

const UserLikeProductLoader = new DataLoader<string, boolean>(async (ids) => {
  const productIds = ids.map((id) => new Types.ObjectId(id.split("-")[0]));
  const userIds = ids.map((id) => new Types.ObjectId(id.split("-")[1]));

  return ProductLikeModel.aggregate([
    { $match: { productId: { $in: productIds }, userId: { $in: userIds } } },
    { $group: { _id: { productId: "$productId", userId: "$userId" } } },
  ])
    .then((res) => {
      return res.map(({ _id }) => `${_id.productId}-${_id.userId}`);
    })
    .then((res) => {
      return ids.map((id) => res.includes(id)) as boolean[];
    });
});
