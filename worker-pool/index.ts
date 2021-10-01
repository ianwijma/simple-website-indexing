import Pool from "./pool";
import Worker from "./worker";

async function boostrap() {
  if (process.env.WORKER_TYPE === "pool") {
    new Pool().start();
  } else {
    new Worker().start();
  }
}
