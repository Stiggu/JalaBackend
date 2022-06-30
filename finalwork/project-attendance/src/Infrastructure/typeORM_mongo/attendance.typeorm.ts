import {AttendanceRepository} from "../../Repository/attendanceRepository";
import {Attendance} from "../../Core/attendance";
import {AttendanceMapper} from "./attendanceMapper";
import {AttendanceEntity} from "./attendance.entity";
import {NoRelationsDataSource} from "./dataSource";
import {Repository} from "typeorm";
import {ValueNotFound} from "../../Core/exceptions/valueNotFound";
import {injectable} from "inversify";

@injectable()
export class AttendanceTypeorm implements AttendanceRepository {

    constructor(
        private readonly repo: Repository<AttendanceEntity> = NoRelationsDataSource.getRepository(AttendanceEntity)
    ) {
    }

    async createAttendance(attendance: Attendance): Promise<Attendance> {
        const mappedAttendance = AttendanceMapper.mapToEntity(attendance);
        const savedAttendance = await this.repo.save(mappedAttendance);
        return AttendanceMapper.mapToCore(savedAttendance);
    }

    async deleteAttendance(id: string): Promise<void> {
        const attendance = await this.repo.findOne({
            where: {
                id: id,
            }
        })

        if (!attendance) {
            throw new ValueNotFound(`Attendance with ID: ${id} does not exist!`);
        }

        await this.repo.remove(attendance);
    }

    async getAllAttendances(): Promise<Attendance[]> {
        const attendances = await this.repo.find();
        ;
        return attendances.map(attendance => AttendanceMapper.mapToCore(attendance));
    }

    async getAllAttendancesById(id: string): Promise<Attendance[] | undefined> {
        const attendances = await this.repo.findBy({
            userId: id,
        });

        return attendances ? attendances.map(attendance => AttendanceMapper.mapToCore(attendance)) : undefined;
    }

}