import { Container } from 'inversify';
import IRepository from "../../Repository/Interfaces/IRepository";
import pieceRepository from "../../Infrastructure/DB/sqlite/PieceRepository";
import GameRepository from "../../Infrastructure/DB/sqlite/GameRepository";

export const container = new Container();

// Bind to use DB from the outside
container.bind<IRepository>(pieceRepository).to(pieceRepository);
container.bind<IRepository>(GameRepository).to(GameRepository);