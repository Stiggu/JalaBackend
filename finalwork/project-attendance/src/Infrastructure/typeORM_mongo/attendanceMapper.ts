import {Attendance} from "../../Core/attendance";
import {AttendanceEntity} from "./attendance.entity";

export class AttendanceMapper {
    static mapToEntity(data: Attendance): AttendanceEntity {
        return {
            id: data.id,
            userId: data.userId,
            attendedAt: data.attendedAt,
            notes: data.notes,
            start: data.start,
            end: data.end,
        }
    }

    static mapToCore(data: AttendanceEntity): Attendance {
        return new Attendance({
            id: data.id,
            userId: data.userId,
            attendedAt: data.attendedAt,
            notes: data.notes,
            start: data.start,
            end: data.end,
        })
    }
}