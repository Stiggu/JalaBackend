import "reflect-metadata";
import { injectable } from "inversify";
import IRepository from '../../Repository/Interfaces/IRepository'

@injectable()
export default class pieceRepository implements IRepository {
    create(item: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    update(id: string, item: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    find(item: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: string): Promise<string> {
        console.log('a');
        throw new Error("Method not implemented.");
    }
}
