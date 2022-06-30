import {DataSource} from "typeorm";
import {UserEntity} from "./user.entity";

export const RelationalDataSource = new DataSource({
    type: "sqlite",
    database: "rabbit",
    synchronize: true,
    logging: true,
    entities: [UserEntity],
    subscribers: [],
    migrations: [],
})