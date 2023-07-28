import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../base/baseModel";
import { Mongo } from "../../helpers/mongo";

import { getModelDataLoader } from "../../helpers/dataloader";
import {  ActionNotify, ActionNotifySchema, } from "./notifyAction.graphql";

export type Notification = BaseDocument & {
  userId?: string;
  title?: string;
  body?: string;
  image?: string;
  read?: boolean;
  createAt?: Date;
  action?: ActionNotify;
};

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, require: true },
    title: { type: String, require: true },
    body: { type: String },
    image: { type: String },
    read: { type: Boolean, default: false },
    createAt: { type: Date },
    action: { type: ActionNotifySchema ,default:{} },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({userId:1});
notificationSchema.index({title:"text"},{weights:{title:10}})

export const NotificationModel = Mongo.model<Notification>(
  "Notification",
  notificationSchema
);

export const NotificationLoader = getModelDataLoader(NotificationModel);
