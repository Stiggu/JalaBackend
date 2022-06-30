interface AttendanceData {
    id: string,
    userId: string,
    attendedAt: Date,
}

export interface PrimitiveAttendanceData {
    id?: string,
    userId: string,
    attendedAt?: Date,
}

export class Attendance implements AttendanceData{
    attendedAt!: Date;
    id!: string;
    userId: string;
    
    constructor(data: PrimitiveAttendanceData) {
        this.userId = data.userId;

        if(data.id){
            this.id = data.id;
        }
        if(data.attendedAt){
            this.attendedAt = data.attendedAt;
        }
    }

}