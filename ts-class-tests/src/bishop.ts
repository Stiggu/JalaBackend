import Piece from "./piece";
import Position from "./position";
export default class Bishop extends Piece {
    canMove(position: Position): boolean {

        if(position.getRank() == this.position.getRank() && position.getFile() == this.position.getFile()){
            return false;
        }

        return (Math.abs(position.getFile().charCodeAt(0) - this.position.getFile().charCodeAt(0)) 
        == Math.abs(position.getRank() - this.position.getRank()));
    }
}