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
    getPieceAt(board:BoardSquares, pos: Position): Piece | null,
    resetBoard(): void,
    isPathAvailable(board:BoardSquares, from: Position, to: Position): boolean,
    kingsOnCheck(board: BoardSquares, fromPosition: Position, toPosition: Position): boolean[],
    movePieceTo(team: Color, fromPosition: Position, toPosition: Position): GameStatus,
    
}