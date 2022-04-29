import { Square } from './chess_types';
import Position from './position';
export default class Game {
    constructor(private board: Square){}

    isFree(spot: Position): boolean {
        if(this.board[0] == null){
            return true;
        } else {
            return false;
        }
    }

}