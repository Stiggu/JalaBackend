import { inject } from "inversify";
import IKingService from './IKingService';
import pieceRepository from "../Infrastructure/DB/sqlite/PieceRepository";

export default class KingService implements IKingService {
    // Not 100% sure why it needs any
    @inject(pieceRepository) private piece: pieceRepository | any;

    createKing(name: string): void {
        // calling the injected code
        return this.piece.create(name);
    }
    findKing(name: string): void {
        // calling injected code again
        return this.piece.find(name);
    }

}