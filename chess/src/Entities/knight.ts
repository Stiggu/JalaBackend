import Piece from "./piece";
import Position from "./position";

export default class Knight extends Piece {
    canMove(position: Position): boolean {

        const [distanceX, distanceY] = this.getDistranceBetween(position, this.position);

        if(distanceX === 0 && distanceX === 0){
            return false;
        }
        
        const horizontalL = distanceX === 2 && distanceY === 1;
        const verticalL = distanceX === 1 && distanceY === 2;
        
        return horizontalL || verticalL;
    }

    canCapture(piece: Piece): boolean {
        if(this.getColor() === piece.getColor()){
            return false;
        }

        return this.canMove(piece.getPosition());
    }
}