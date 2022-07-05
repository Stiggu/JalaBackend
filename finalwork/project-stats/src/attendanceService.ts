import {CommunicationType} from "./index";
import axios from "axios";

interface AttendanceData {
    id: string,
    userId: string,
    attendedAt: Date,
    notes: string,
    start: string,
    end: string,
}

export interface AttendanceMessage {
    userId: string,
}

export interface AttendanceCommunication {
    type: CommunicationType,
    message: AttendanceMessage,
}

export class AttendanceService {
    
    static attendanceBaseUrl = 'http://localhost:27016/attendances';
    static userBaseUrl = 'http://localhost:27015/users';
    
    static async getAllAttendancesByUser(id: string): Promise<number> {
        const request = await axios({
            url: `${AttendanceService.attendanceBaseUrl}/${id}`
        })
        return request.data.data.length;
    }
    
    static async handleMessage(message: AttendanceCommunication) {
        try {
            const updateUserAttendances = {
                attendance: await AttendanceService.getAllAttendancesByUser(message.message.userId),
                userId: message.message.userId,
            }
            const request = await axios({
                url: `${AttendanceService.userBaseUrl}`,
                method: "PUT",
                data: updateUserAttendances
            })    
        } catch (e) {
            console.log(e);
            console.log(message);
        }
    }
}