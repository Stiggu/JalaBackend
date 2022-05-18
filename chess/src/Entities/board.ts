import {Color, File, GameStatus, Rank} from './chess_types';
import Piece from './piece';
import Rook from './rook';
import Knight from './knight';
import Bishop from './bishop';
import Queen from './queen';
import King from './king';
import Pawn from './pawn';
import Position from './position';
import {fileHelper, fileMapper, fileMapperReverse} from './fileMapper';
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