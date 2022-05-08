import {Color} from "../Entities/chess_types";

export default interface IGameService {
    getGameInformation(): object,
    move(color: Color): object,
}