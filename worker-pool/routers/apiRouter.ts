import { Router } from "express";

const ApiRouter = Router();

ApiRouter.post("/", (req: express.Request, res: express.Response) => {
  console.log("req", req);
  res.send("done");
});

export default ApiRouter;
