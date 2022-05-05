import Bishop from "./bishop";
import { GameOutcome, GameState } from "./chess_types";
import King from "./king";
import Knight from "./knight";
import Pawn from "./pawn";
import Piece from "./piece";
import Queen from "./queen";
import Rook from "./rook";

export default class Game {

    private gameState: GameState;
    private gameOutcome: GameOutcome;
    public pieces: Piece[];

    constructor(){
        this.gameState = 'White\'s Turn';
        this.gameOutcome = 'Playing';
        this.pieces = this.createPieces();
    }

    createPieces(): Piece[]{
        const pieces: Piece[] = [];
        // White
        pieces.push(new Rook('White', 'A', 1));
        pieces.push(new Knight('White', 'B', 1));
        pieces.push(new Bishop('White', 'C', 1));
        pieces.push(new Queen('White', 'D', 1));
        pieces.push(new King('White', 'E', 1));
        pieces.push(new Bishop('White', 'F', 1));
        pieces.push(new Knight('White', 'G', 1));
        pieces.push(new Rook('White', 'H', 1));

        pieces.push(new Pawn('White', 'A', 2));
        pieces.push(new Pawn('White', 'B', 2));
        pieces.push(new Pawn('White', 'C', 2));
        pieces.push(new Pawn('White', 'D', 2));
        pieces.push(new Pawn('White', 'E', 2));
        pieces.push(new Pawn('White', 'F', 2));
        pieces.push(new Pawn('White', 'G', 2));
        pieces.push(new Pawn('White', 'H', 2));

        // Black
        pieces.push(new Rook('Black', 'A', 8));
        pieces.push(new Knight('Black', 'B', 8));
        pieces.push(new Bishop('Black', 'C', 8));
        pieces.push(new Queen('Black', 'D', 8));
        pieces.push(new King('Black', 'E', 8));
        pieces.push(new Bishop('Black', 'F', 8));
        pieces.push(new Knight('Black', 'G', 8));
        pieces.push(new Rook('Black', 'H', 8));
        
        pieces.push(new Pawn('Black', 'A', 7));
        pieces.push(new Pawn('Black', 'B', 7));
        pieces.push(new Pawn('Black', 'C', 7));
        pieces.push(new Pawn('Black', 'D', 7));
        pieces.push(new Pawn('Black', 'E', 7));
        pieces.push(new Pawn('Black', 'F', 7));
        pieces.push(new Pawn('Black', 'G', 7));
        pieces.push(new Pawn('Black', 'H', 7));

        return pieces;
    }
}