import {Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BoardSquares} from "../chess_types";
import Piece from "../piece";

@Entity()
export default class Board {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Piece, (piece) => piece.id)
    board!: BoardSquares
        
    // public board!: (null[] | Piece[])[];
    // public capturedPieces: Piece[] = [];
    // public currentTurn!: Color;
    // public turn!: number;
    // private kings: King[] = [];
}