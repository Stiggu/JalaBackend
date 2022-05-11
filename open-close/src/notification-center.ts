import {User} from './user';
import INotification from "./INotification";
import INotificationCenter from "./INotificationCenter";

export class NotificationCenter implements INotificationCenter{
    notify<T extends INotification>(type: T, user: User, message: string) {
        type.notification(user, message);
    }
}