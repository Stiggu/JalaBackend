import {Color, GameOutcome, GameState} from "./chess_types";
import Board from "./board";
import Player from "./player";

export default class Game {
    public board: Board;
    public players: Player[] = [];
    private gameOutcome: GameOutcome;
    private started: boolean = false;

    constructor(){
        this.gameOutcome = 'Game hasn\'t started yet';
        this.board = Game.createBoard()
    }
    
    protected startGame(){
        this.gameOutcome = 'Waiting for Players';
        this.board.createBoard();
        return this.getGameStatus();
    }

    private static createBoard(): Board{
        return new Board();
    }
    
    protected getGameStatus() {
        return {
            outcome: this.gameOutcome,
            players: this.players,
            boardState: this.board.getBoardData()
        }
    }

    protected movePiece(color: Color): object{
        if(!this.started){
            return {
                status: "Game is not live yet."
            };
        }
        return {
            isMoved: this.board.move(color),
        }
    }
    
    protected makePlayer(name: string): object{
        if(this.players.length == 2){
            return {
                playerState: 'Game is Full!',
                player: null,
            }
        }
        const newPlayer = new Player(name);
        if(this.players.filter(player => player.id === newPlayer.id).length > 0){
            return this.makePlayer(name);
        } else {
            this.players.push(newPlayer);
            if(this.players.length == 2){
                this.gameOutcome = "Playing";
                this.started = true;
            }
            return {
                player: newPlayer,
                playerState: `Player ${newPlayer.name} has joined to the duel!`
            };
        }
    }
    
}