import { gql } from "apollo-server-express";

import { Schema } from "mongoose";
import { GraphqlServer } from "../../helpers/graphql/resolver";
import { OrderLoader } from "../order/order.model";
import { ProductLoader } from "../product/product.model";

export enum ActionType {
  ORDER = "ORDER",
  PRODUCT = "PRODUCT",
  PROMOTION = "PROMOTION",
  WEBSITE = "WEBSITE",
  NONE = "NONE"
}
export type ActionNotify = {
  type?: ActionType;
  orderId?:string;
  productId?:string;
  promotionId?:string;
  websiteUrl?:string;
};
export const ActionNotifySchema = new Schema({
  type: {
    type: String,
    enum: Object.values(ActionType),
    default: ActionType.NONE,
  },
  orderId:{type:Schema.Types.ObjectId,},
  productId:{type:Schema.Types.ObjectId},
  promotionId:{type:Schema.Types.ObjectId},
  websiteUrl:{type:String},
});
export default {
  schema: gql`
    type ActionNotify {
      "TYPE OF ACTION ${Object.values(ActionType)}"
      type: String
      orderId:ID
      productId:ID
      promotionId:ID
      websiteUrl:String
      "don hang"
      order:Order 
      "san pham"
      product:Product
    }
    input ActionNotifyInput {
       "TYPE OF ACTION ${Object.values(ActionType)}"
      type: String
      orderId:ID
      productId:ID
      promotionId:ID
      websiteUrl:String
    }
  `,
  resolvers: {
    ActionNotify:{
      order:GraphqlServer.load(OrderLoader,"orderId"),
      product:GraphqlServer.load(ProductLoader,"productId"),
    }
  },
};
