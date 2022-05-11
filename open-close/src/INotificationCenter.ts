import INotification from "./INotification";
import {User} from "./user";

export default interface INotificationCenter {
    notify<T extends INotification>(type: T, user: User, message: string): void
}