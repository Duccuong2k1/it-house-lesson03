import { gql } from "apollo-server-express";
import { Context } from "../../helpers/graphql/context";
import { Schema } from "mongoose";
export type OrderItemAttribute = {
  attrId?: string;
  attrName?: string;
  attrPrice?: number;
  attrOptionName?: string;
  attrOptionPrice?: number;
};

export const OrderItemAttributeSchema = new Schema({
  attrId: { type: String, require: true },
  attrName: { type: String },
  attrPrice: { type: Number, default: 0 },
  attrOptionName: { type: String },
  attrOptionPrice: { type: Number, default: 0 },
});
export default {
  schema: gql`
    type OrderItemAttribute{
      attrId: String
      attrName: String
      attrPrice: Float
      attrOptionName: String
      attrOptionPrice: Float
    }
    type OrderItemAttributeInput {
      attrId: String
      attrName: String
      attrPrice: Float
      attrOptionName: String
      attrOptionPrice: Float
    }

  `,
  resolvers: {
    
  },
};
