import Application from "../common/application";
import ApiRouter from "./routers/apiRouter";
import DashboardRouter from "./routers/dashboardRouter";

export default class Pool {
  app: Application;

  constructor() {
    this.app = new Application();
    const { express } = this.app;
    express.use("/", DashboardRouter);
    express.use("/api", ApiRouter);
  }

  async start() {
    await this.app.listen();
  }
}
