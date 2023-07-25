import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../base/baseModel";
import { Mongo } from "../../helpers/mongo";
import { Attribute, AttributeSchema } from "./attribute/attribute.graphql";
import DataLoader from "dataloader";
import logger from "../../helpers/logger";
import _ from "lodash";

export type Product = BaseDocument & {
  code?: string;
  name?: string;
  description?: string;
  basePrice?: number;
  sellPrice?: number;
  images?: string[];
  categoryId?: string;
  view?: number;
  attributes?: Attribute[];
  active?: boolean;
};

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String },
    basePrice: { type: Number, default: 0 },
    sellPrice: { type: Number, default: 0 },
    images: { type: [String], default: [] },
    categoryId: { type: Schema.Types.ObjectId },
    view: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
    attributes: { type: [AttributeSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ categoryId: 1 });
productSchema.index({ code: 1 }, { unique: true });
productSchema.index(
  { name: "text", code: "text" },
  { weights: { name: 10, code: 3 } }
);

export const ProductModel = Mongo.model<Product>("Product", productSchema);

export const ProductLoader = new DataLoader(
  async (ids) => {
    logger.info("id",{ids});
    const products = await ProductModel.find({ _id: { $in: ids } });
    const keyById = _.keyBy(products, "_id");

    return ids.map((id) => _.get(keyById, id as string, null));
  },
  { cache: true }
);
