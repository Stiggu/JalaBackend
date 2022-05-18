import Piece from "./piece";
import Position from "./position";
export default class Bishop extends Piece {
    canMove(position: Position): boolean {
        const [distanceX, distanceY] = this.getDistranceBetween(position, this.position);

        if(distanceY === 0 && distanceX === 0){
            return false;
        }

        const diagonal = distanceX === distanceY

        return diagonal;
    }

    canCapture(piece: Piece): boolean {
        if(this.getColor() === piece.getColor()){
            return false;
        }

        return this.canMove(piece.getPosition());
    }
}