import { Router, Request, Response } from "express";
import { JobType } from "../../common/constants";
import { sendError, sendSuccess } from "../libs/express";
import queueManager from "../libs/queueManager";

const ApiRouter = Router();

ApiRouter.post("/", (req: Request, res: Response) => {
  console.log("req", req);
  res.send("done");
});

ApiRouter.post("/new", (req: Request, res: Response) => {
  const { body } = req;
  const { url } = body;
  queueManager
    .createJob(JobType.ENQUEUE_URL, { url })
    .then(() => sendSuccess(res, "Job added", { url }))
    .catch((err) => sendError(res, err, { url }));
});

export default ApiRouter;
