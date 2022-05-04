import "reflect-metadata";
import { DataSource } from 'typeorm';
import Piece from "./Entities/piece";
import Game from './Entities/game';
import Outcome from "./Entities/outcome";
import PieceType from './Entities/piece_type';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "chess.sqlite",
    logging: true,
    entities: [],
});