import Pool from "./pool";
import Worker from "./worker";

if (process.env.WORKER_TYPE) {
  new Worker().start();
} else {
  new Pool().start();
}
