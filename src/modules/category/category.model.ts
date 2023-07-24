import { Priority } from "./../../../node_modules/@smithy/types/dist-types/ts3.4/middleware.d";
import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../base/baseModel";
import { Mongo } from "../../helpers/mongo";

export type Category = BaseDocument & {
  name?: string;
  description?: string;
  active?: boolean; // trang thái
  productIds?: string[]; // mã sản phẩm
  priority?: number; // ưu tiên
};

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean, default: false },
    productIds: { type: [Schema.Types.ObjectId], default: [] },
    priority: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

categorySchema.index({ Priority: 1 });
categorySchema.index({ name: 1 }, { unique: true });
categorySchema.index({ name: "text" }, { weights: { name: 10 } });

export const CategoryModel = Mongo.model<Category>("Category", categorySchema);
