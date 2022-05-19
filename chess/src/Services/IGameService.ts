import IGame from "../Entities/IGame";
import BoardService from "./BoardService";

export default interface IGameService extends IGame {
    
    //Vars
    board: BoardService,
    
    // Functions
    createBoard(): BoardService,

    
    getGameInformation(): void,
    // move(color: Color, from: Position, to:Position): object,
    // createNewPlayer(name: string): object,
    // getPiece(pos: Position): Piece | null,
    // start(): object,
}