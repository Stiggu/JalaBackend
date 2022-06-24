import {User} from "../Core/User";

export default interface UserRepository {
    createUser(user: User): Promise<User>;
    findUser(id: number): Promise<User | undefined>;
}