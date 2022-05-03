import { Container } from 'inversify';
import pieceRepository from '../Infrastructure/Repositories/DB/PieceRepository';
import IRepository from '../Repository/Interfaces/IRepository';

export const container = new Container();

// Bind to use DB from the outside
container.bind<IRepository>(pieceRepository).to(pieceRepository);