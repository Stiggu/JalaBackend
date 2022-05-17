import Handler from "../Entities/idHandler";

export default class HandlerService implements Handler {
    makeID(): number{
        return Math.floor(Math.random() * 9999999999);
    }
}