import { gql } from "apollo-server-express";
import { Context } from "../../helpers/graphql/context";
import { Schema } from "mongoose";
import { GraphqlServer } from "../../helpers/graphql/resolver";
import { ProductLoader } from "../product/product.model";
import { OrderItemAttribute, OrderItemAttributeSchema } from "./orderItemAttribute.graphql";

export type OrderItem = {
  id?: string;
  productId?: string;
  productName?: string;
  productPrice?: number;
  productImage?: string;
  productSellPrice?: number; // gia san pham
  qty?: number; // so luong
  amount?: number; // thanh tien
  attrs?: OrderItemAttribute[]; // thuoc tinh
  attrAmount?: number; // thanh tien thuoc tinh
};

export const OrderItemSchema = new Schema({
  productId: { type: String, require: true },
  productName: { type: String, require: true },
  productPrice: { type: String },
  productImage: { type: String },
  productSellPrice: { type: Number, default: 0 }, // gia san pham
  qty: { type: Number, default: 1, min: 1 }, // so luong
  amount: { type: Number, default: 0 }, // thanh tien
  attrs: { type: [OrderItemAttributeSchema], default: [] }, // thuoc tinh
  attrAmount: { type: Number, default: 0 }, // thanh tien thuoc tinh
});

export default {
  schema: gql`
    type OrderItem {
      id: ID
      productId: ID
      productName: String
      productPrice: Float
      productImage: String
      "gia san pham"
      productSellPrice: Float
      "so luong"
      qty: Int
      "thanh tien"
      amount: Float
      "thuoc tinh"
      attrs: [OrderItemAttribute]
      "thanh tien thuoc tinh"
      attrAmount: Float
      "san pham"
      product: Product
    }
    type OrderItemInput {
      productId: ID
      "gia san pham"
      productSellPrice: Float
      "so luong"
      qty: Int

      "thuoc tinh"
      attrs: [OrderItemAttributeInput]
    }
  `,
  resolvers: {
    OrderItem: {
      product: GraphqlServer.load(ProductLoader, "productId"),
    },
  },
};
