import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../base/baseModel";
import { Mongo } from "../../helpers/mongo";
import { getModelDataLoader } from "../../helpers/dataloader";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
export type User = BaseDocument & {
  uid?: string;
  username?: string; // username
  name?: string;
  phone?: string;
  role?: UserRole; // quyen
  password?: string;
  email?: string;
  signInProvider?: string;
  scopes: string[];
  deviceTokens?:string;
};

const userSchema = new Schema(
  {
    uid: { type: String },
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    role: { type: String, required: true, enum: Object.values(UserRole) },
    signInProvider: { type: String },
    scopes: { type: [String] },
    deviceTokens: { type: [String] ,default:[]},
  },
  {
    timestamps: true,
  }
);

userSchema.index({ username: 1 }, { unique: true });
// feature search
// search with text
//  weights là trọng số xét theo độ ưu tiên số cao thì ưu tiên cao hơn
userSchema.index(
  { name: "text", username: "text", phone: "text" },
  { weights: { name: 10, phone: 1, username: 5 } }
);

export const UserModel = Mongo.model<User>("User", userSchema);

export const UserLoader = getModelDataLoader(UserModel);
