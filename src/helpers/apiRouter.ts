import { Application, Request, Response, Router } from "express";
import { loadRouter } from "./autoloader";
import logger from "./logger";
export type RouterConfig = {
  method: "get" | "post" | "put" | "delete";
  path: string;
  midd: () => ((req: Request, rep: Response, next: () => void) => void)[];
  handler: (req: Request, rep: Response) => Promise<void>;
};
export class ApiRouter {
  router = Router();
  constructor(private app: Application) {}
  async start(path = "/api") {
    const configs = await loadRouter();

    for (const { method, path, midd, handler } of configs) {
      this.router[method](path, midd, handler);
    }
    this.app.use(path, this.router);

    logger.info(`api router start path ${path}`);
  }
}
