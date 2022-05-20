import Position from "./position";
import {File, Rank, Color, PieceKind} from "./chess_types";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Board from "./Models/board.model";

@Entity()
export default abstract class Piece {
    
    @PrimaryGeneratedColumn()
    @OneToMany(() => Board, (pieces) => pieces.board)
    id!: number;
    
    @Column()
    turn: number = 0;

    @Column()
    isCaptured: boolean;
    
    protected position: Position;
    protected hasMoved: boolean;
    
    
    constructor(public readonly name: PieceKind, private readonly color: Color, file: File, rank: Rank){
        this.position = new Position(file, rank);
        this.hasMoved = false;
        this.isCaptured = false;
    }
    
    getPosition(): Position{
        return this.position;
    }

    moveTo(position: Position): void{
        this.setMoved();
        this.position = position;
    }

    setMoved(): void {
        this.hasMoved = true;
    }
    
    setPiecePosition(pos: Position){
        this.position = pos;
    }
    
    getColor(): Color{
        return this.color;
    }
    
    getDistranceBetween(startPosition: Position, endPosition: Position): number[] {
        const distanceX = Math.abs(endPosition.getFile().charCodeAt(0) - startPosition.getFile().charCodeAt(0));
        const distanceY = Math.abs(endPosition.getRank() - startPosition.getRank());
        return [distanceX, distanceY];
    }

    getDirectionBetween(startPosition: Position, endPosition: Position): number[] {
        const directionX = Math.sign(endPosition.getFile().charCodeAt(0) - startPosition.getFile().charCodeAt(0));
        const directionY = Math.sign(endPosition.getRank() - startPosition.getRank());
        return [directionX, directionY];
    }

    abstract canMove(position: Position): boolean;
    abstract canCapture(piece: Piece): boolean;
}