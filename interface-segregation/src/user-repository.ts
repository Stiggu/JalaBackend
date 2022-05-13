import Repository from './repository';
import User from './user';
import IRead from "./IRead";
import IWrite from "./IWrite";
import IDelete from "./IDelete";

export default class UserRepository implements IRead<User>, IWrite<User>, IDelete<User>{
    insert(entity: User): User {
        console.log('insert ok');
        return new User();
    }
    update(id: number, entity: User): User {
        console.log('update ok');
        return new User();
    }
    get(id: number): User {
        console.log('get ok');
        return new User();
    }
    delete(id: number): void {
        console.log('delete ok');
    }

}