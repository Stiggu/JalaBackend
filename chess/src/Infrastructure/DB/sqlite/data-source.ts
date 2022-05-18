import { DataSource } from 'typeorm';
import Game from "../../../Entities/game";
import Board from "../../../Entities/board";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "chess.sqlite",
    logging: true,
    synchronize: true,
    entities: [Game, Board],
    // entities: [__dirname + '../../../**/*.entity.{ts,js}']
});