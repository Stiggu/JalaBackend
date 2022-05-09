import Position from "./position";
import {File, Rank, Color, PieceKind} from "./chess_types";

export default abstract class Piece {
    protected position: Position;
    private hasMoved: boolean;
    private isCaptured: boolean;
    
    constructor(public readonly name: PieceKind, private readonly color: Color, file: File, rank: Rank){
        this.position = new Position(file, rank);
        this.hasMoved = false;
        this.isCaptured = false;
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

    abstract canMove(position: Position): boolean;
}