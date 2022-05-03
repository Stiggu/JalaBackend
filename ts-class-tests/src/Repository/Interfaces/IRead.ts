export default interface IRead {
    find(item: string): Promise<string[]>;
    findOne(id: string): Promise<string>;
  }