import {CommunicationType} from "./types";

export interface userMessage {
    userId: string,
    message?: string,
}

export interface Communication {
    type: CommunicationType,
    message: userMessage,
}