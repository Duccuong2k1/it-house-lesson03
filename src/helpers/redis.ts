import { createClient } from "redis";
import logger from "./logger";

const redis = createClient({
  url: "redis://localhost:6379",
});

redis
  .connect()
  .then(() => {
    logger.info("redis connected");
  })
  .catch((err) => {
    logger.error("redis connection error", err);
  });
export default redis;
