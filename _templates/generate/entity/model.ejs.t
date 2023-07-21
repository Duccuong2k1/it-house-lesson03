---
to: src/modules/<%= h.inflection.camelize(name,true) %>/<%= h.inflection.camelize(name, true) %>.model.ts

---

import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../base/baseModel";
import { Mongo } from "../../helpers/mongo";


export type <%= h.inflection.camelize(name) %> = BaseDocument & {
  name?: string;
};

const <%= h.inflection.camelize(name, true) %>Schema = new Schema(
  {
    name: { type: String ,required: true},
  },
  {
    timestamps: true,
  }
);



export const <%= h.inflection.camelize(name) %>Model = Mongo.model<<%= h.inflection.camelize(name) %>>("<%= h.inflection.camelize(name) %>", <%= h.inflection.camelize(name, true) %>Schema);
