import { Container } from 'inversify';
import IRepository from "../../Repository/Interfaces/IRepository";
import pieceRepository from "../../Infrastructure/DB/sqlite/PieceRepository";
import GameRepository from "../../Infrastructure/DB/sqlite/GameRepository";
import BoardRepository from "../../Infrastructure/DB/sqlite/BoardRepository";
import {IGameRepository} from "../../Repository/Interfaces/IGameRepository";
import DI from "./depencencyInversionTypes";

const container = new Container();

container.bind<IRepository>(DI.IPieceRepository).to(pieceRepository);
container.bind<IGameRepository>(DI.IGameRepository).to(GameRepository);
container.bind<IRepository>(DI.IBoardRepository).to(BoardRepository);

export default container;