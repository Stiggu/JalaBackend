import Piece from './piece';
import position from './position';
import {TEAMS} from "./chess_globals";
export default class Pawn extends Piece{
    canMove(position: position): boolean {
        
        const distanceX = position.getFile().charCodeAt(0) - this.position.getFile().charCodeAt(0);
        const distanceY = position.getRank() - this.position.getRank();
        
        if ( distanceX !== 0) return false;
        
        if(this.getColor() == TEAMS.WHITE && distanceY === 1){
            return true;
        } else if(this.getColor() == TEAMS.BLACK && distanceY === -1){
            return true;
        }
        return false;
    }

    canCapture(piece: Piece): boolean {
        return false;
    }
}