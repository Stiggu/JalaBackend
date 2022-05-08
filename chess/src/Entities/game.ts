import {Color, GameOutcome, GameState} from "./chess_types";
import Board from "./board";

export default class Game {
    private gameOutcome: GameOutcome;
    public board: Board;

    constructor(){
        this.gameOutcome = 'Playing';
        this.board = Game.createBoard()
    }

    private static createBoard(): Board{
        return new Board();
    }
    
    protected getGameStatus() {
        return {
            outcome: this.gameOutcome,
            boardState: this.board.getBoardData()
        }
    }

    protected movePiece(color: Color): object{
        return {
            isMoved: this.board.move(color),
        }
    }
    
}