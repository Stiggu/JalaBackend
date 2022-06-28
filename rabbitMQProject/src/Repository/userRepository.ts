import {User} from "../Core/User";

export default interface UserRepository {
    createUser(user: User): Promise<User>;
    findUser(id: string): Promise<User | undefined>;
    findAllUsers(name?: string, alias?: string): Promise<User[]>;
    deleteUser(id: string): Promise<void>;
}