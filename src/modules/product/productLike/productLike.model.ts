import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../../base/baseModel";
import { Mongo } from "../../../helpers/mongo";

export type ProductLike = BaseDocument & {
  productId?: string;
  userId?: string;
};

const productLikeSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId },
    userId: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

productLikeSchema.index({ productId: 1 });
productLikeSchema.index({ product: 1, userId: 1 }, { unique: true });

export const ProductLikeModel = Mongo.model<ProductLike>(
  "ProductLike",
  productLikeSchema
);
