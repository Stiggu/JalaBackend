import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class Board {
    
    @PrimaryGeneratedColumn()
    id!: number;
    
    // public board!: (null[] | Piece[])[];
    // public capturedPieces: Piece[] = [];
    // public currentTurn!: Color;
    // public turn!: number;
    // private kings: King[] = [];
}