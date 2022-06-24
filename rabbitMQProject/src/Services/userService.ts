import {inject, injectable} from "inversify";
import {UserTypes} from "./types";
import UserRepository from "../Repository/userRepository";
import {CreateUserDto} from "./dto/createUser.dto";
import {User} from "../Core/User";

@injectable()
export class UserService {
    constructor(@inject(UserTypes.userRepository) private readonly userRepository: UserRepository) { }
    
    async getUser(id: number){
        return await this.userRepository.findUser(id);
    }
    
    async createUser(request: CreateUserDto){
        const data = {
            id: request.id,
            name: request.name,
        }
        const user = new User(data);
        return await this.userRepository.createUser(user);
    }
}