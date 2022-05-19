import IGameService from "./IGameService";
import {inject, injectable} from "inversify";
import {Color, GameOutcome, GameStatus} from "../Entities/chess_types";
import Position from "../Entities/position";
import IBoardStatus from "../Entities/IBoardStatus";
import Player from "../Entities/player";
import Reporter from "./reporter";
import BoardService from "./BoardService";
import HandlerService from "./idHandlerService";
import {MAX_PLAYERS} from "../Entities/chess_globals";
import {IGameRepository} from "../Repository/Interfaces/IGameRepository";
import DI from "./Inversion/depencencyInversionTypes";
import container from "./Inversion/config"
import getDecorators from "inversify-inject-decorators";

const {lazyInject} = getDecorators(container);

@injectable()
export default class GameService implements IGameService {
    id!: number
    board: BoardService;
    players: Player[] = [];
    gameOutcome: GameOutcome;
    started: boolean = false;
    handler: HandlerService = new HandlerService();

    @lazyInject(DI.IGameRepository) private _GameRepository!: IGameRepository;
    
    constructor() {
        this.gameOutcome = 'Game hasn\'t started yet';
        this.board = this.createBoard()
    }

    getPlayerCount() {
        return this.players.length;
    }

    startGame(): IBoardStatus {
        this.gameOutcome = 'Waiting for Players';
        this.board.resetBoard();
        this.id = this.handler.makeID();
        return this.getGameStatus('Game Has Been Started');
    }

    createBoard(): BoardService {
        return new BoardService();
    }

    getGameStatus(message: GameStatus): IBoardStatus {
        return Reporter.currentStatus(message, this);
    }

    movePiece(team: Color, fromPosition: Position, toPosition: Position): IBoardStatus {
        if (!this.started){
            return this.getGameStatus('Game is not live yet');
        }
        const movementAnswer = this.board.movePieceTo(team, fromPosition, toPosition);
        return this.getGameStatus(movementAnswer);
    }

    makePlayer(name: string): IBoardStatus {
        if (this.getPlayerCount() === MAX_PLAYERS){
            return this.getGameStatus('Game is full!');
        }
        
        const newPlayer = new Player(name);
        this.players.push(newPlayer);

        if (this.getPlayerCount() === MAX_PLAYERS) {
            this.gameOutcome = 'Playing';
            this.started = true;
        }

        return this.getGameStatus('A Player has joined the game!');
    }

    getGameInformation(): string {
        console.log(this._GameRepository);
        this._GameRepository.findOne(1);
        return 'worked';
    }
}