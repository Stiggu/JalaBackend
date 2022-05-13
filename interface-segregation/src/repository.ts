export default interface Repository<T> {

    insert(entity: T): T;
    update(id: number, entity: T): T;
    get(id: number): T;
    delete(id: number): void;

}