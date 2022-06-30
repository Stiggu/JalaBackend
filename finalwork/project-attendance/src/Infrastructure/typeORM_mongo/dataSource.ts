import {DataSource} from "typeorm";
import {AttendanceEntity} from "./attendance.entity";

export const NoRelationsDataSource = new DataSource({
    type: "mongodb",
    host: "127.0.0.1",
    port: 27017,
    username: "admin",
    password: "admin",
    database: "attendances",
    synchronize: true,
    logging: true,
    entities: [AttendanceEntity],
    subscribers: [],
    migrations: [],
})