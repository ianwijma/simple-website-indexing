import Application from "../../common/application";
import DashboardRouter from "./routers/dashboardRouter";
import ApiRouter from "./routers/apiRouter";

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
