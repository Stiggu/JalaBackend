import {User} from "../Core/User";

export default interface UserRepository {
    createUser(user: User): Promise<User>;
    findUser(id: string): Promise<User | undefined>;
    findAllUsers(name?: string, alias?: string): Promise<User[] | undefined>;
    deleteUser(id: string): Promise<void>;
    saveUser(user: User): Promise<void>;
}