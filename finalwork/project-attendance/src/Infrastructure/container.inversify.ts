import {Container} from "inversify";
import {AttendanceService} from "../Services/attendanceService";
import {AttendanceTypes} from "../Services/types";
import {AttendanceRepository} from "../Repository/attendanceRepository";
import {AttendanceTypeorm} from "./typeORM_mongo/attendance.typeorm";

export const inversifyContainer = new Container();
inversifyContainer.bind<AttendanceService>(AttendanceTypes.attendanceService).to(AttendanceService);
inversifyContainer.bind<AttendanceRepository>(AttendanceTypes.attendanceRepository).to(AttendanceTypeorm);
