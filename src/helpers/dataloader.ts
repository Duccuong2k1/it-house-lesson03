import DataLoader from "dataloader";
import { Model } from "mongoose";
import logger from "./logger";
import _ from "lodash";

export function getModelDataLoader<T>(model:Model<T>){
return  new DataLoader(
    async (ids) => {
      logger.info("id",{ids});
      const items = await model.find({ _id: { $in: ids } });
      const keyById = _.keyBy(items, "_id");
  
      return ids.map((id) => _.get(keyById, id as string, null)) as T[];
    },
    // { cache: true }
  );
}