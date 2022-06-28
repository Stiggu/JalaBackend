import {User} from "../Core/User";

export default interface UserRepository {
    createUser(user: User): Promise<User>;
    findUser(id: string): Promise<User | undefined>;
    findAllUsers(): Promise<User[]>;
    deleteUser(id: string): Promise<void>;
}