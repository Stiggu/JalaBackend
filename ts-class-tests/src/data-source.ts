import "reflect-metadata";
import { DataSource } from 'typeorm';
import Piece from "./Entities/piece";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "chess.sqlite",
    synchronize: true,
    logging: false,
    entities: [Piece],
    migrations: [],
    subscribers: [],
});