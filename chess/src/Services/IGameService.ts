import {Color} from "../Entities/chess_types";
import Piece from "../Entities/piece";
import Position from "../Entities/position";
import IGame from "../Entities/IGame";
import Board from "../Entities/board";
import BoardService from "./BoardService";

export default interface IGameService extends IGame {
    
    //Vars
    board: BoardService,
    
    // Functions
    createBoard(): BoardService,

    
    // getGameInformation(): object,
    // move(color: Color, from: Position, to:Position): object,
    // createNewPlayer(name: string): object,
    // getPiece(pos: Position): Piece | null,
    // start(): object,
}