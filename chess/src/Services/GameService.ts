import IGameService from "./IGameService";
import {inject} from "inversify";
import GameRepository from "../Infrastructure/DB/sqlite/GameRepository";
import {Color, GameOutcome, GameStatus} from "../Entities/chess_types";
import Position from "../Entities/position";
import IBoardStatus from "../Entities/IBoardStatus";
import Player from "../Entities/player";
import Reporter from "./reporter";
import BoardService from "./BoardService";
import HandlerService from "./idHandlerService";
import { MAX_PLAYERS } from "../Entities/chess_globals";

export default class GameService implements IGameService {

    @inject(GameRepository) private GameRep: GameRepository | any;

    id!: number
    board: BoardService;
    players: Player[] = [];
    gameOutcome: GameOutcome;
    started: boolean = false;
    handler: HandlerService = new HandlerService();

    constructor(){
        this.gameOutcome = 'Game hasn\'t started yet';
        this.board = this.createBoard()
    }

    getPlayerCount() {
        return this.players.length;
    }
    
    startGame(): IBoardStatus{
        // Starts the game
        this.gameOutcome = 'Waiting for Players';
        this.board.resetBoard();
        this.id = this.handler.makeID();
        // Report
        return this.getGameStatus('Game Has Been Started');
    }

    createBoard(): BoardService{
        return new BoardService();
    }

    getGameStatus(message: GameStatus): IBoardStatus {
        return Reporter.currentStatus(message, this);
    }

    movePiece(team: Color, fromPosition: Position, toPosition:Position): IBoardStatus{
        if(!this.started) {
            return this.getGameStatus('Game is not live yet');
        }
        const movementAnswer = this.board.movePieceTo(team, fromPosition, toPosition);
        return this.getGameStatus(movementAnswer);
    }

    makePlayer(name: string): IBoardStatus {
        if(this.getPlayerCount() == MAX_PLAYERS){
            return this.getGameStatus('Game is full!');
        }
        
        const newPlayer = new Player(name);
        this.players.push(newPlayer);
        
        if(this.getPlayerCount() == MAX_PLAYERS){
            this.gameOutcome = 'Playing';
            this.started = true;
        }
        
        return this.getGameStatus('A Player has joined the game!');
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