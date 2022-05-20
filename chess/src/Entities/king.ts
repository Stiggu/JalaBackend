import Piece from "./piece";
import Position from "./position";

export default class King extends Piece {
    
    canMove(position: Position): boolean {

        const [distanceX, distanceY] = this.getDistranceBetween(position, this.position);
        const [directionX, directionY] = this.getDirectionBetween(position, this.position);

        if(directionX === 0 && directionY === 0){
            return false;
        }

        return distanceX <= 1 && distanceY <= 1;
    }

    canCapture(piece: Piece): boolean {
        if(this.getColor() === piece.getColor()){
            return false;
        }
        return this.canMove(piece.getPosition());
    }
}
