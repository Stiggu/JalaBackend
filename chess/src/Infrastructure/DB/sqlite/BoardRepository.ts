import IRepository from "../../../Repository/Interfaces/IRepository";
import {injectable} from "inversify";

@injectable()
export default class BoardRepository implements IRepository{
    create(item: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    delete(id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    find(item: string): Promise<string[]> {
        return Promise.resolve([]);
    }

    findOne(id: number): Promise<string> {
        return Promise.resolve("");
    }

    update(id: string, item: string): Promise<boolean> {
        return Promise.resolve(false);
    }
    
}