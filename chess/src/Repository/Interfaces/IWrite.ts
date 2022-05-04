export default interface IWrite {
    create(item: string): Promise<boolean>;
    update(id: string, item: string): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}