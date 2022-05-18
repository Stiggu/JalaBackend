import { DataSource } from 'typeorm';
import Board from "../../../Entities/Models/board.model";
import Game from "../../../Entities/Models/game.model";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "chess.sqlite",
    logging: true,
    synchronize: true,
    entities: [Game, Board],
    // entities: [__dirname + '../../../**/*.entity.{ts,js}']
});