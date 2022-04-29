import Piece from "./piece";
import Position from "./position";

export default class Knight extends Piece {
    canMove(position: Position): boolean {
        return (Math.abs(position.getFile().charCodeAt(0) - this.position.getFile().charCodeAt(0)) == 2 
                && Math.abs(position.getRank() - this.position.getRank()) == 1)
                || (Math.abs(position.getFile().charCodeAt(0) - this.position.getFile().charCodeAt(0)) == 1 
                && Math.abs(position.getRank() - this.position.getRank()) == 2); 
    }
}