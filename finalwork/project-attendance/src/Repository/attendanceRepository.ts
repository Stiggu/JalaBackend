import {Attendance} from "../Core/attendance";

export interface AttendanceRepository {
    createAttendance(attendance: Attendance): Promise<Attendance>;
    getAllAttendances(): Promise<Attendance[] | undefined>;
    getAllAttendancesById(id: string): Promise<Attendance[] | undefined>;
    deleteAttendance(id: string): Promise<void>;
    deleteAllAttendancesForUser(userId: string): Promise<void>;
    getAttendance(id: string): Promise<Attendance | undefined>;
}