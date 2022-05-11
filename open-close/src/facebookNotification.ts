import {User} from "./user";
import INotification from "./INotification";

export default class FacebookNotification implements INotification{
    notification(user: User, message:string): void{
        console.log(`[Facebook]: ${message}`);
    }
}