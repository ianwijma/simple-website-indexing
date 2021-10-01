import express, { Express } from "express";

export default class Application {
  public host: string = process.env.APP_HOST || "0.0.0.0";
  public port: number = parseInt(process.env.APP_PORT, 10) || 3000;
  public express: Express;

  constructor() {
    this.express = express();
    this.express.use(express.json());
  }

  async listen(): Promise<Express> {
    return new Promise((resolve, reject) => {
      const handleRejection = (err) => reject(err); // This is always hard.

      // Listen for errors
      this.express.once("error", handleRejection);
      this.express.listen(this.port, this.host, () => {
        // No errors when listening
        this.express.off("error", handleRejection);

        resolve(this.express);

        console.log(`Server listening on ${this.host}:${this.port}`);
      });
    });
  }
}
