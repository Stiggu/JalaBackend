import Player from "./player";
import {Color, GameOutcome, GameStatus} from "./chess_types";
import IBoardStatus from "./IBoardStatus";
import Position from "./position";

export default interface IGame{
    // VARS
    id: number,
    players: Player[],
    gameOutcome: GameOutcome,
    started: boolean,
    
    // FUNCTIONS
    startGame(): IBoardStatus,
    getGameStatus(message: GameStatus): IBoardStatus,
    movePiece(color: Color, from: Position, to:Position): IBoardStatus,
    makePlayer(name: string): IBoardStatus,
    
}