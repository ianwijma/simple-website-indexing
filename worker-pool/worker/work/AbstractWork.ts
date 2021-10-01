export default abstract class AbstractWork {
  constructor() {}

  public abstract setup(): Promise<any>;

  public abstract execute<T>(id: string, data: T): Promise<any>;
}
