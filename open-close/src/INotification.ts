import {User} from "./user";

export default interface INotification {
    notification(user:User, message:string): void;
}