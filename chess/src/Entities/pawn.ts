import Piece from './piece';
import position from './position';
import {TEAMS} from "./chess_globals";
export default class Pawn extends Piece{
    canMove(position: position): boolean {
        
        const distanceX = position.getFile().charCodeAt(0) - this.position.getFile().charCodeAt(0);
        const distanceY = position.getRank() - this.position.getRank();
        
        if ( distanceX !== 0) return false;

        if(this.getColor() == TEAMS.WHITE){
            return this.hasMoved ? distanceY === 1: distanceY <= 2 && distanceY > 0;
        } else {
            return this.hasMoved ? distanceY === -1 : distanceY >= -2 && distanceY < 0;
        }
    }

    canCapture(piece: Piece): boolean {
        if(this.getColor() === piece.getColor()){
            return false;
        }
        
        const distanceX = piece.getPosition().getFile().charCodeAt(0) - this.position.getFile().charCodeAt(0);
        const distanceY = piece.getPosition().getRank() - this.position.getRank();

        if(this.getColor() == TEAMS.WHITE){
            return distanceX === 1 && distanceY === 1 || distanceX === -1 && distanceY === 1;
        } else {
            return distanceX === 1 && distanceY === -1 || distanceX === -1 && distanceY === -1;
        }
    }
}