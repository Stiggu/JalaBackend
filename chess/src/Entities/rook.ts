import Position from "./position";
import Piece from './piece';

export default class Rook extends Piece{
    canMove(position: Position): boolean {

        const [directionX, directionY] = this.getDirectionBetween(position, this.position);

        if(directionX === 0 && directionY === 0){
            return false;
        }

        const horizontal = directionX !== 0 && directionY === 0;
        const vertical = directionX === 0 && directionY !== 0;
        
        return horizontal || vertical;
    }

    canCapture(piece: Piece): boolean {
        if(this.getColor() === piece.getColor()){
            return false;
        }

        return this.canMove(piece.getPosition());
    }
}