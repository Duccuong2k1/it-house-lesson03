import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../base/baseModel";
import { Mongo } from "../../helpers/mongo";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
export type User = BaseDocument & {
  uid?:string; 
  username?: string; // username
  name?: string;
  phone?: string;
  role?: UserRole; // quyen
  password?: string;
  email?: string;
  signInProvider?:string;
  scopes:string[];
};

const userSchema = new Schema(
  {
    uid: { type: String },
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String},
    phone: { type: String },
    role: { type: String, required: true, enum: Object.values(UserRole) },
    signInProvider:{type:String},
    scopes:{type:[String]}
  },
  {
    timestamps: true,
  }
);

userSchema.index({ username: 1 }, { unique: true });

export const UserModel = Mongo.model<User>("User", userSchema);
