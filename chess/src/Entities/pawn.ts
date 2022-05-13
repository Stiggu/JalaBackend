import Piece from './piece';
import position from './position';
export default class Pawn extends Piece{
    canMove(position: position): boolean {
        return Math.abs(position.getRank() - this.position.getRank()) == 1;
    }
}