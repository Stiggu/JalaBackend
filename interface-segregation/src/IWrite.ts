export default interface IWrite<T> {
    insert(entity: T): T;
    update(id: number, entity: T): T;
}