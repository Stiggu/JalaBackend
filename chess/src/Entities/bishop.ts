import Piece from "./piece";
import Position from "./position";

export default class Bishop extends Piece {
    canMove(position: Position): boolean {
        const [distanceX, distanceY] = this.getDistranceBetween(position, this.position);
        
        if(distanceX === 0 && distanceY === 0){
            return false;
        }
        
        return distanceX === distanceY;
    }

    canCapture(piece: Piece): boolean {
        if(this.getColor() === piece.getColor()){
            return false;
        }

        return this.canMove(piece.getPosition());
    }
}