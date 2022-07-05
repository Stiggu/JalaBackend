import {inject, injectable} from "inversify";
import {AttendanceRepository} from "../Repository/attendanceRepository";
import {AttendanceTypes} from "./types";
import {Attendance, PrimitiveAttendanceData} from "../Core/attendance";
import {ValueNotFound} from "../Core/exceptions/valueNotFound";
import {SenderService} from "./senderService";
import {CommunicationType} from "../Core/types";
import {Communication} from "../Core/communication";

@injectable()
export class AttendanceService {
    constructor(
        @inject(AttendanceTypes.attendanceRepository) private readonly attendanceRepository: AttendanceRepository,
        @inject(AttendanceTypes.senderService) private readonly senderService: SenderService,
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
        this.senderService.sendMessage(messageToSend);
        return createdAttendance
    }

    async findAllAttendances() {
        const attendances = await this.attendanceRepository.getAllAttendances();

        if (!attendances) {
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

    async deleteAllAttendancesForUser(id: string) {
        await this.attendanceRepository.deleteAllAttendancesForUser(id);
    }

}