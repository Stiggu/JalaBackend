import {AttendanceMessage, CommunicationType} from "./types";

export interface Communication {
    type: CommunicationType,
    message: AttendanceMessage,
}