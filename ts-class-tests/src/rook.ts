import Position from "./position";
import Piece from './piece';

export default class Rook extends Piece{
    canMove(position: Position): boolean {
        return (position.getFile().charCodeAt(0) == this.position.getFile().charCodeAt(0)
        && position.getRank() != this.position.getRank())
        || (position.getFile().charCodeAt(0) != this.position.getFile().charCodeAt(0)
        && position.getRank() == this.position.getRank());
    }
}