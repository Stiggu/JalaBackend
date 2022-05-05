import Position from "./position";
import { File, Rank, Color } from "./chess_types";

export default abstract class Piece {
    protected position: Position;
    private hasMoved: boolean;
    
    constructor(private readonly Color: Color, private file: File, private rank: Rank){
        this.position = new Position(file, rank);
        this.hasMoved = false;
    }

    moveTo(position: Position): void{
        this.setMoved();
        this.position = position;
    }

    setMoved(): void {
        this.hasMoved = true;
    }

    abstract canMove(position: Position): boolean;
}