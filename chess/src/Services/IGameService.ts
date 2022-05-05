import Piece from "../Entities/piece";

export default interface IGameService {
    createGame(): Piece[],
}