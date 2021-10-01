import Arena from "bull-arena";

import Bee from "bee-queue";
import { JobType } from "../common/constants";

const host: string = process.env.REDIS_HOST || "127.0.0.1";
const port: number = parseInt(process.env.REDIS_PORT, 10) || 6379;
const password: string = process.env.REDIS_PASSWORD || "";

const getQueueData = (jobType: string | JobType) => {
  return {
    host,
    port,
    password,
    name: jobType as string,
    hostId: "Default host",
  };
};

const DashboardRouter = Arena({
  Bee,
  queues: Object.values(JobType).map(getQueueData),
});

export default DashboardRouter;
