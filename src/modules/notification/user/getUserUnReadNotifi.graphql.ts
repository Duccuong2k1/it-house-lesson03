import { gql } from "apollo-server-express";
import { Context } from "../../../helpers/graphql/context";
import DataLoader from "dataloader";
import { NotificationModel } from "../notification.model";
import { Types } from "mongoose";
import _ from "lodash";

export default {
  schema: gql`
    extend type User {
      unReadNotify: Int
    }
  `,
  resolvers: {
    User: {
      unReadNotify: async (root: any, args: any, context: Context) => {
        return  UnReadNotifyLoader.load(root._id.toString())
      },
    },
  },
};

const UnReadNotifyLoader = new DataLoader<string, number>(async (ids) => {
  const objectIds = ids.map((id) => new Types.ObjectId(id));
  return await NotificationModel.aggregate([
    { $match: { userId: { $in: objectIds }, read: false } },
    { $group: { _id: "$userId", count: { $sum: 1 } } },
  ]).then((res) => {
    const keyById = _.keyBy(res, "_id");
    return ids.map((id) => _.get(keyById, `${id}.count`, 0) as number);
  });
});
