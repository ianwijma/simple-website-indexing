import { Job } from "bee-queue";
import { JobType } from "../common/constants";
import queueManager from "../pool/libs/queueManager";
import AbstractWork from "./work/AbstractWork";
import EnqueueUrlWork from "./work/enqueueUrlWork";
import ExtractMetaWork from "./work/extractMetaWork";
import ExtractPreviewWork from "./work/extractPreviewWork";
import ExtractSearchWork from "./work/extractSearchWork";
import FetchPageWork from "./work/fetchPageWork";

export default class Worker {
  type: JobType;
  work: AbstractWork;

  constructor() {
    this.setType();
  }

  private setType() {
    if (process.env.WORKER_TYPE in JobType) {
      this.type = process.env.WORKER_TYPE as JobType;
    } else {
      this.unknownTypeError();
    }
  }

  unknownTypeError(): void {
    const msg = `Unknown WORKER_TYPE environment variable: ${process.env.WORKER_TYPE}`;
    throw new Error(msg);
  }

  private async setupWorker() {
    switch (this.type) {
      case JobType.ENQUEUE_URL:
        this.work = new EnqueueUrlWork();
      case JobType.FETCH_PAGE:
        this.work = new FetchPageWork();
      case JobType.EXTRACT_META:
        this.work = new ExtractMetaWork();
      case JobType.EXTRACT_PREVIEW:
        this.work = new ExtractPreviewWork();
      case JobType.EXTRACT_SEARCH:
        this.work = new ExtractSearchWork();
      default:
        this.unknownTypeError();
    }

    await this.work.setup();
  }

  async start() {
    await this.setupWorker();
    const queue = queueManager.get(this.type);
    queue.process(async (job) => this.handleJob(job));
  }

  private async handleJob<T>(job: Job<T>): Promise<any> {
    const { id, data } = job;
    console.log(`Processing job with id ${id} and type ${this.type}`);
    return await this.work.execute<T>(id, data);
  }
}
