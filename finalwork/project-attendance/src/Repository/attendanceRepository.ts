import {Attendance} from "../Core/attendance";

export interface AttendanceRepository {
    createAttendance(attendance: Attendance): Promise<Attendance>;
    getAllAttendances(): Promise<Attendance[]>;
    getAllAttendancesById(id: string): Promise<Attendance[] | undefined>;
    deleteAttendance(id: string): Promise<void>;
}