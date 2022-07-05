import axios from "axios";
import {CommunicationType} from "./index";

export interface userMessage {
    userId: string,
    message?: string,
}

export interface UserCommunication {
    type: CommunicationType,
    message: userMessage,
}

export class UserService {
    static async handleMessage(message: UserCommunication) {
        const baseUrl = `http://localhost:27016/attendances/${message.message.userId}`;
        const request = await axios({
            url: `${baseUrl}`,
            method: "DELETE",
        })
    }
}