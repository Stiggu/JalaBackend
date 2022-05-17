import Piece from "./piece";
import {Color, GameStatus} from "./chess_types";
import King from "./king";
import Position from "./position";

export default interface IBoard {
    // Vars
    board: (null[] | Piece[])[],
    capturedPieces: Piece[],
    currentTurn: Color,
    turn: number,
    kings: King[],

    // Functions
    getPieceAt(pos: Position): Piece | null,
    resetBoard(): void,
    isPathAvailable(board:(null[] | Piece[])[], from: Position, to: Position): boolean,
    isKingOnCheck(board: (null[] | Piece[])[], from: Position, to: Position, turn: Color): boolean,
    movePieceTo(team: Color, fromPosition: Position, toPosition: Position): GameStatus,
    
}