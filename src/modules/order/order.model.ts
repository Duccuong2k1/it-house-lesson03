import { Document, Schema, Types } from "mongoose";
import { BaseDocument } from "../../base/baseModel";
import { Mongo } from "../../helpers/mongo";

import { getModelDataLoader } from "../../helpers/dataloader";
import { OrderItem, OrderItemSchema } from "./orderItem.graphql";
export enum OrderStatus {
  PENDING = "PENDING", // CHO XU LY DON
  PROCESSING = "PROCESSING", // TIEN HANH GIAO
  SHIPPING = "SHIPPING", // DANG SHIP
  DELIVERED = "DELIVERED", // DANG GIAO HANG
  CANCELED = "CANCELED", // HUY DON
}

export type Order = BaseDocument & {
  code?: string;
  buyerId?: string;
  buyerName?: string;
  buyerPhone?: string;
  buyerAddress?: string;
  buyerLocation?: any;
  subtotal?: number;
  discount?: number;
  shipfree?: number;
  amount?: number;
  status?: OrderStatus;
  promotionName?: string; // ten khuyen mai
  promotionCode?: string; // codo khuyen mai
  promotionId?: string;
  rewardPoint?: number; // diem thuong
  useRewardPoint?: boolean; // su dung diem thuong
  rewardPointDiscount?: number; // giam gia diem thuong
  items: OrderItem[];
};

const orderSchema = new Schema(
  {
    code: { type: String, require: true },
    buyerId: { type: Schema.Types.ObjectId, require: true },
    buyerName: { type: String, require: true },
    buyerPhone: { type: String, require: true },
    buyerAddress: { type: String, require: true },
    buyerLocation: { type: Schema.Types.Mixed, require: true },
    subtotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    shipfree: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    promotionName: { type: String }, 
    promotionCode: { type: String }, 
    promotionId: { type: Schema.Types.ObjectId },
    rewardPoint: { type: Number, default: 0 }, 
    useRewardPoint: { type: Boolean, default: false }, 
    rewardPointDiscount: { type: Number, default: 0 }, 
    items: { type: [OrderItemSchema], default: [] },
  },
  {
    timestamps: true,
  }
);
orderSchema.index({code:1})
orderSchema.index({code:"text"},{weights:{code:10}})
export const OrderModel = Mongo.model<Order>("Order", orderSchema);

export const OrderLoader = getModelDataLoader(OrderModel);
