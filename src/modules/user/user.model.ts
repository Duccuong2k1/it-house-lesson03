import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../base/baseModel";
import { Mongo } from "../../helpers/mongo";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
export type User = BaseDocument & {
  username?: string; // username
  name?: string;
  phone?: string;
  role?: UserRole; // quyen
  password?: string;
  email?: string;
};

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, required: true, enum: Object.values(UserRole) },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ username: 1 }, { unique: true });

export const UserModel = Mongo.model<User>("User", userSchema);
