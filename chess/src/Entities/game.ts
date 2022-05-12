import {Color, GameOutcome, GameState, GameStatus} from "./chess_types";
import Board from "./board";
import Player from "./player";
import Position from "./position";
import Reporter from "./reporter";
import IBoardStatus from "./IBoardStatus";
import IdHandler from "./idHandler";

export default class Game {
    public id!: number
    public board: Board;
    public players: Player[] = [];
    private gameOutcome: GameOutcome;
    private started: boolean = false;

    constructor(){
        this.gameOutcome = 'Game hasn\'t started yet';
        this.board = Game.createBoard()
    }

    protected startGame(): IBoardStatus{
        // Starts the game
        this.gameOutcome = 'Waiting for Players';
        this.board.createBoard();
        this.id = IdHandler.makeID();
        // Report
        return this.getGameStatus('Game Has Been Started');
    }

    private static createBoard(): Board{
        return new Board();
    }
    
    protected getGameStatus(message: GameStatus): IBoardStatus {
        return Reporter.currentStatus(message, this);
    }

    protected movePiece(color: Color, from: Position, to:Position): IBoardStatus{
        if(!this.started) return this.getGameStatus('Game is not live yet');
        const hasMoved = this.board.move(color, from, to);
        if(!hasMoved) return this.getGameStatus('Invalid move');
        return this.getGameStatus('Piece has been moved');
    }
    
    protected makePlayer(name: string): object{
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
    
}