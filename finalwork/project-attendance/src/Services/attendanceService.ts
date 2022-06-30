import {inject, injectable} from "inversify";
import {AttendanceRepository} from "../Repository/attendanceRepository";
import {AttendanceTypes} from "./types";
import {Attendance, PrimitiveAttendanceData} from "../Core/attendance";
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class AttendanceService {
    constructor(
        @inject(AttendanceTypes.attendanceRepository) private readonly attendanceRepository: AttendanceRepository
    ) {
    }

    async createAttendance(data: PrimitiveAttendanceData) {
        const attendance = new Attendance({
            userId: data.userId,
            attendedAt: new Date()
        })
        
        return this.attendanceRepository.createAttendance(attendance);

    }

    async findAllAttendances() {
        return await this.attendanceRepository.getAllAttendances();
    }

    async findAllAttendancesById(id: string) {
        return await this.attendanceRepository.getAllAttendancesById(id);
    }
    
    async deleteAttendance(id: string){
        await this.attendanceRepository.deleteAttendance(id);
    }

}