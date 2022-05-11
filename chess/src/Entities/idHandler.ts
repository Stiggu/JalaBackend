export default class IdHandler {
    static makeID(): number{
        return Math.floor(Math.random() * 9999999999);
    }
}