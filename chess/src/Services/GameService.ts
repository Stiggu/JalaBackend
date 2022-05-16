import IGameService from "./IGameService";
import {inject} from "inversify";
import GameRepository from "../Infrastructure/DB/sqlite/GameRepository";
import {Color, GameOutcome, GameStatus} from "../Entities/chess_types";
import Position from "../Entities/position";
import IBoardStatus from "../Entities/IBoardStatus";
import Player from "../Entities/player";
import IdHandler from "../Entities/idHandler";
import Reporter from "./reporter";
import BoardService from "./BoardService";

export default class GameService implements IGameService {

    @inject(GameRepository) private GameRep: GameRepository | any;

    public id!: number
    public board: BoardService;
    public players: Player[] = [];
    gameOutcome: GameOutcome;
    started: boolean = false;

    constructor(){
        this.gameOutcome = 'Game hasn\'t started yet';
        this.board = this.createBoard()
    }

    startGame(): IBoardStatus{
        // Starts the game
        this.gameOutcome = 'Waiting for Players';
        this.board.createBoard();
        this.id = IdHandler.makeID();
        // Report
        return this.getGameStatus('Game Has Been Started');
    }
    

    createBoard(): BoardService{
        return new BoardService();
    }

    getGameStatus(message: GameStatus): IBoardStatus {
        return Reporter.currentStatus(message, this);
    }

    movePiece(color: Color, from: Position, to:Position): IBoardStatus{
        if(!this.started) return this.getGameStatus('Game is not live yet');
        const movementAnswer = this.board.move(color, from, to);
        return this.getGameStatus(movementAnswer);
    }

    makePlayer(name: string): IBoardStatus{
        if(this.players.length == 2){
            return this.getGameStatus('Game is full!');
        }
        const newPlayer = new Player(name);
        if(this.players.filter(player => player.id === newPlayer.id).length > 0){
            return this.makePlayer(name);
        } else {
            this.players.push(newPlayer);
            if(this.players.length == 2){
                this.gameOutcome = 'Playing';
                this.started = true;
            }
            return this.getGameStatus('A Player has joined the game!');
        }
    }
    

    // getPiece(pos: Position): Piece | null {
    //     return this.board.getPieceAt(this.board.board, pos);
    // }
    //
    // getGameInformation(): IBoardStatus {
    //     return this.getGameStatus('Current Board status');
    // }
    //
    // move(color: Color, from: Position, to: Position): object {
    //     return this.movePiece(color, from, to);
    // }
    //
    // createNewPlayer(name: string): object {
    //     return this.makePlayer(name);
    // }
    //
    // start(): object {
    //     return this.startGame();
    // }
}