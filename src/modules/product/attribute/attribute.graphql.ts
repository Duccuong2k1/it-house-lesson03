import { gql } from "apollo-server-express";
import { Schema } from "mongoose";
import { AttributeOption, AttributeOptionSchema } from "./attributeOption.graphql";

export type Attribute = {
  _id?: string;
  name?: string;
  required?: boolean;
  min?: number; // Số lượng option chọn tối thiểu
  max?: number; // số lượng option chọn tối đa
  options?: AttributeOption[];
};

export const AttributeSchema = new Schema({
  name: { type: String, required: true },
  required: { type: Boolean, default: false },
  min: { type: Number, default: [] },
  max: { type: Number, default: 0 },
  options: { type: [AttributeOptionSchema], default: [] },
});
export default {
  schema: gql`
    type Attribute{
        _id:ID
        name:String
        required:Boolean
        " Số lượng option chọn tối thiểu"
        min:Int 
        "số lượng option chọn tối đa"
        max:Int
        options:[AttributeOption]
    }

    input AttributeInput {
        name:String
        required:Boolean
        " Số lượng option chọn tối thiểu"
        min:Int 
        "số lượng option chọn tối đa"
        max:Int
        options:[AttributeOptionInput]
    }
    `,
  resolvers: {},
};
