import { gql } from "apollo-server-express";
import { Context } from "../../../helpers/graphql/context";
import { Schema } from "mongoose";

export type AttributeOption = {
  _id?:string;
  name?:string;
  price?:number; // giá 
  isDefault?:boolean; // mặc định

}


export const AttributeOptionSchema = new Schema({
  name:{type:String,required:true},
  price:{type:Number,default:0},
  isDefault:{type:Boolean,default:false},
  
})

export default {
  schema: gql`
    type AttributeOption {
      id:ID,
      name:String
      price:Float 
      isDefault:Boolean 
    }

    input AttributeOptionInput {
      name:String
      price:Float
      isDefault:Boolean
    }
  `,
  resolvers: {
   
  },
};
