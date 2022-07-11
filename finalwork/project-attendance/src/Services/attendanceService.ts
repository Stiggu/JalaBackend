import {inject, injectable} from "inversify";
import {AttendanceRepository} from "../Repository/attendanceRepository";
import {AttendanceTypes} from "./types";
import {Attendance, PrimitiveAttendanceData} from "../Core/attendance";
import {ValueNotFound} from "../Core/exceptions/valueNotFound";
import {CommunicationType} from "../Core/types";
import {Communication} from "../Core/communication";
import {SenderService} from "./senderService";

@injectable()
export class AttendanceService {
    constructor(
        @inject(AttendanceTypes.attendanceRepository) private readonly attendanceRepository: AttendanceRepository,
    ) {
    }

    async createAttendance(data: PrimitiveAttendanceData) {
        const attendance = new Attendance({
            userId: data.userId,
            attendedAt: new Date(),
            notes: data.notes,
            start: data.start,
            end: data.end,
        })
        
        const messageToSend: Communication = {
            type: CommunicationType.ATTENDANCE,
            message: {
                userId: attendance.userId,
            }
        }
        
        const createdAttendance = this.attendanceRepository.createAttendance(attendance);
        const sender = await SenderService.getInstance();
        await sender.sendMessage(messageToSend);
        return createdAttendance
    }

    async findAllAttendances() {
        const attendances = await this.attendanceRepository.getAllAttendances();

        if (!attendances) {
            throw new ValueNotFound('There are no attendances!.')
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

    async deleteAllAttendancesForUser(id: string) {
        await this.findAllAttendancesById(id);
        await this.attendanceRepository.deleteAllAttendancesForUser(id);
    }

}