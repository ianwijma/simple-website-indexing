import Queue, { Job } from "bee-queue";
import { JobType } from "../../common/constants";

type Queues = {
  [key in JobType]?: Queue;
};

class QueueManager {
  queues: Queues = {};

  constructor() {
    this.setup();
  }

  private setup() {
    const jobTypes = Object.values(JobType);
    jobTypes.forEach((jobType) => {
      this.queues[jobType] = new Queue(jobType as string);
    });
  }

  has(queueName: JobType): boolean {
    return queueName in this.queues;
  }

  get(queueName: JobType): Queue {
    if (!this.has(queueName)) throw new Error("Unknown queueName");
    return this.queues[queueName];
  }

  async createJob<T>(
    queueName: JobType,
    workData: T
  ): Promise<{ job: Job<T> }> {
    return new Promise((resolve, reject) => {
      const queue = this.get(queueName);
      const job = queue.createJob<T>(workData);
      job
        .save()
        .then((job) => resolve({ job }))
        .catch((error) => reject(error));
    });
  }
}

const queueManager = new QueueManager();
export default queueManager;
