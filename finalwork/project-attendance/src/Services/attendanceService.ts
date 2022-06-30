﻿import {inject, injectable} from "inversify";
import {AttendanceRepository} from "../Repository/attendanceRepository";
import {AttendanceTypes} from "./types";
import {Attendance, PrimitiveAttendanceData} from "../Core/attendance";
import {v4 as uuidv4} from 'uuid';
import {ValueNotFound} from "../Core/exceptions/valueNotFound";

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
        const attendances = await this.attendanceRepository.getAllAttendances();

        if (attendances.length === 0) {
            throw new ValueNotFound('There are no attendances given the query.')
        }

        return attendances;
    }

    async findAllAttendancesById(id: string) {
        const attendances = await this.attendanceRepository.getAllAttendancesById(id);

        if (!attendances) {
            throw new ValueNotFound(`The ID: ${id} does not have any attendances!`)
        }

        return attendances;
    }

    async deleteAttendance(id: string) {
        const attendance = await this.attendanceRepository.getAttendance(id);

        if (!attendance) {
            throw new ValueNotFound(`Attendance ID: ${id} does not exist!`)
        }

        await this.attendanceRepository.deleteAttendance(id);
    }

}