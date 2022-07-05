import {Attendance} from "./attendance";

export enum HttpStatusCode {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
}

export enum CommunicationType {
    ATTENDANCE = 0,
    USER = 1,
}

export interface AttendanceMessage {
    userId: string,
    attendances: Attendance[] | undefined
}