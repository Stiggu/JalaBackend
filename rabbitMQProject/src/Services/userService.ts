import {inject, injectable} from "inversify";
import {UserTypes} from "./types";
import UserRepository from "../Repository/userRepository";
import {User} from "../Core/User";
import {UpdateUserDto} from "./dto/updateUser.dto";
import {ValueNotFound} from "../Core/exceptions/valueNotFound";

@injectable()
export class UserService {
    constructor(@inject(UserTypes.userRepository) private readonly userRepository: UserRepository) { }
    
    async createUser(request: User){
        const data = {
            name: request.name,
            alias: request.alias,
        }
        const user = new User(data);
        return await this.userRepository.createUser(user);
    }
    
    async updateUser(request: UpdateUserDto){
        const data = {
            name: request.name,
            alias: request.alias,
            attendance: request.attendance,
        }
    }

    async getUser(id: string){
        const user = await this.userRepository.findUser(id);

        if(!user){
            throw new ValueNotFound(`User with ID: ${id} does not exist!`);
        }
        
        return user;
    }
    
    async getAllUsers(){
        return await this.userRepository.findAllUsers();
    }
    
    async deleteUser(id: string){
        await this.userRepository.deleteUser(id);
    }
}