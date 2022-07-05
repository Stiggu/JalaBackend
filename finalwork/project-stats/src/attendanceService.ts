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
    attendances: AttendanceData[]
}

export interface AttendanceCommunication {
    type: CommunicationType,
    message: AttendanceMessage,
}

export class AttendanceService {
    static async handleMessage(message: AttendanceCommunication) {
        const baseUrl = 'http://localhost:27015/users';
        try {
            const updateUserAttendances = {
                attendance: message.message.attendances.length,
                userId: message.message.userId,
            }
            const request = await axios({
                url: `${baseUrl}`,
                method: "PUT",
                data: updateUserAttendances
            })    
        } catch (e) {
            console.log(e);
            console.log(message);
        }
        
    }
}