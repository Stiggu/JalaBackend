import {User} from "./user";
import INotification from "./INotification";

export default class EmailNotification implements INotification{
    notification(user: User, message:string): void{
        console.log(`[Email]: ${message}`);
    }
}