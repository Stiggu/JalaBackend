import { inject, injectable } from "inversify";
import pieceRepository from "../Infrastructure/Repositories/DB/PieceRepository";
import IKingService from './IKingService';

@injectable()
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