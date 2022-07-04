import {UserId} from "./valueObjects/userId";
import {AttendanceStart} from "./valueObjects/attendanceStart";
import {AttendanceEnd} from "./valueObjects/attendanceEnd";

interface AttendanceData {
    id: string,
    userId: string,
    attendedAt: Date,
    notes: string,
    start: string,
    end: string,
}

export interface PrimitiveAttendanceData {
    id?: string,
    userId: string,
    attendedAt?: Date,
    notes: string,
    start: string,
    end: string,
}

export class Attendance implements AttendanceData {
    attendedAt!: Date;
    id!: string;
    userId: string;
    notes!: string;
    start: string;
    end: string;

    constructor(data: PrimitiveAttendanceData) {
        this.userId = new UserId(data.userId).value();
        this.start = new AttendanceStart(data.start).value();
        this.end = new AttendanceEnd(data.end).value();
        
        if (data.id) {
            this.id = data.id;
        }
        if (data.attendedAt) {
            this.attendedAt = data.attendedAt;
        }
        if (data.notes) {
            this.notes = data.notes;
        }

    }

}