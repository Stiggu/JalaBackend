import {Color} from "../Entities/chess_types";
import Piece from "../Entities/piece";
import Position from "../Entities/position";

export default interface IGameService {
    getGameInformation(): object,
    move(color: Color, from: Position, to:Position): object,
    createNewPlayer(name: string): object,
    getPiece(pos: Position): Piece | null,
    start(): object,
}