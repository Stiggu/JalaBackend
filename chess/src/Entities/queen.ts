import Piece from "./piece";
import Position from "./position";

export default class Queen extends Piece {
    canMove(position: Position): boolean {
        
        const [distanceX, distanceY] = this.getDistranceBetween(position, this.position);
        const [directionX, directionY] = this.getDirectionBetween(position, this.position);
        
        if(directionX === 0 && directionY === 0){
            return false;
        }
        
        const diagonal = distanceX === distanceY
        const horizontal = directionX !== 0 && directionY === 0;
        const vertical = directionX === 0 && directionY !== 0;
        
        return diagonal || horizontal || vertical;
    }

    canCapture(piece: Piece): boolean {
        if(this.getColor() === piece.getColor()){
            return false;
        }
        
        return this.canMove(piece.getPosition());
    }
}
