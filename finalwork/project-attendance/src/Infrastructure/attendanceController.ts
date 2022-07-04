import {controller, httpDelete, httpGet, httpPost, request, requestParam, response} from "inversify-express-utils";
import {AttendanceTypes} from "../Services/types";
import {AttendanceService} from "../Services/attendanceService";
import {inject} from "inversify";
import express from "express";
import {ResponseHandler} from "../Core/responseHandler";
import {PrimitiveAttendanceData} from "../Core/attendance";

@controller('/attendances')
export class AttendanceController {

    constructor(
        @inject(AttendanceTypes.attendanceService) private readonly attendanceService: AttendanceService
    ) {
    }

    @httpGet('/')
    private async getAllAttendances(@request() req: express.Request, @response() res: express.Response) {
        const attendances = await this.attendanceService.findAllAttendances();
        ResponseHandler.success(res, attendances);
    }

    @httpPost('/')
    private async createAttendance(@request() req: express.Request, @response() res: express.Response) {
        const data: PrimitiveAttendanceData = {
            userId: req.body.userId,
            notes: req.body.notes,
            start: req.body.start,
            end: req.body.end,
        }
        const attendance = await this.attendanceService.createAttendance(data);
        ResponseHandler.created(res, attendance);
    }

    @httpGet('/:id')
    private async getAttendanceById(@requestParam('id') id: string, @response() res: express.Response) {
        const attendances = await this.attendanceService.findAllAttendancesById(id);
        ResponseHandler.success(res, attendances);
    }

    @httpDelete('/:id')
    private async deleteAttendance(@requestParam('id') id: string, @response() res: express.Response) {
        await this.attendanceService.deleteAllAttendancesForUser(id);
        ResponseHandler.deleted(res);
    }
}