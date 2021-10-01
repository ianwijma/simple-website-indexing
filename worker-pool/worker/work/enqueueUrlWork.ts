import AbstractWork from "./AbstractWork";

export default class EnqueueUrlWork extends AbstractWork {
  public setup(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public execute<T>(id: string, data: T): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
