import { Container } from 'inversify';
import pieceRepository from "../../Infrastructure/DB/PieceRepository";
import IRepository from "../../Repository/Interfaces/IRepository";
import GameRepository from "../../Infrastructure/DB/GameRepository";

export const container = new Container();

// Bind to use DB from the outside
container.bind<IRepository>(pieceRepository).to(pieceRepository);
container.bind<IRepository>(GameRepository).to(GameRepository);