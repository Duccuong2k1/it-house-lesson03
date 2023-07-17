---
to: <%= h.dir(name) %>/ <%= h.name(name,true) %>.model.ts

---

import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../base/baseModel";
import { Mongo } from "../../helpers/mongo";


export type <%= h.name(name) %> = BaseDocument & {
 
  name?: string;
 
};

const <%= h.dir(name,true) %>Schema = new Schema(
  {
   
    name: { type: String, required: true },

  },
  {
    timestamps: true,
  }
);



export const <%= h.dir(name) %>Model = Mongo.model<<%= h.dir(name) %>>("<%= h.dir(name) %>", <%= h.dir(name,true) %>Schema);
