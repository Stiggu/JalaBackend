import Position from "./position";
import { File, Rank, Color } from "./chess_types";

export default abstract class Piece {
    protected position: Position;
    constructor(private readonly Color: Color, private file: File, private rank: Rank){
        this.position = new Position(file, rank);
    }

    moveTo(position: Position): void{
        this.position = position;
    }

    abstract canMove(position: Position): boolean;
}