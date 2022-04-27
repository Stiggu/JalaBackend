import Position from "./position";
import Piece from './piece';

export default class Rook extends Piece{
    canMove(position: Position): boolean {
        
        if(position.getRank() == this.position.getRank() && position.getFile() == this.position.getFile()){
            return false;
        }

        return (position.getRank() != this.position.getRank() || position.getFile() != this.position.getFile())
        && position.getFile().charCodeAt(0) == this.position.getFile().charCodeAt(0)
        || position.getRank() == this.position.getRank();
    }
}