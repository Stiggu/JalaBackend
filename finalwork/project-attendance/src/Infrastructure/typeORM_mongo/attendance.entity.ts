import {Column, Entity, ObjectIdColumn} from "typeorm";

@Entity()
export class AttendanceEntity {
    @ObjectIdColumn()
    id!: string;

    @Column()
    userId!: string;
    
    @Column()
    attendedAt!: Date;
    
    @Column()
    notes!: string;
    
    @Column()
    start!: string;
    
    @Column()
    end!: string;
}
