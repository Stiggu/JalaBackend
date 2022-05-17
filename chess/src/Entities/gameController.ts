import {Color} from "./chess_types";
import Position from "./position";
import IBoardStatus from "./IBoardStatus";

export default interface GameController {
    movePieceTo(team: Color, fromPosition: Position, toPosition: Position): IBoardStatus,
    makePlayer(name: string): IBoardStatus,
}