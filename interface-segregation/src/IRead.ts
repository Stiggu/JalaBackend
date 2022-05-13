export default interface IRead<T> {
    get(id: number): T;
}