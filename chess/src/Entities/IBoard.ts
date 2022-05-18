import Piece from "./piece";
import {BoardSquares, Color, GameStatus} from "./chess_types";
import King from "./king";
import Position from "./position";

export default interface IBoard {
    // Vars
    board: BoardSquares,
    capturedPieces: Piece[],
    currentTeamTurn: Color,
    turn: number,
    kings: King[],

    // Functions
    getPieceAt(pos: Position): Piece | null,
    resetBoard(): void,
    isPathAvailable(board:BoardSquares, from: Position, to: Position): boolean,
    isKingOnCheck(board: BoardSquares, from: Position, to: Position, turn: Color): boolean,
    movePieceTo(team: Color, fromPosition: Position, toPosition: Position): GameStatus,
    
}