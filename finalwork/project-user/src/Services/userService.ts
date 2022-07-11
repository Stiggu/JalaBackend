import {inject, injectable} from "inversify";
import {UserTypes} from "./types";
import UserRepository from "../Repository/userRepository";
import {PrimitiveUserData, User} from "../Core/User";
import {UpdateUserDto} from "./dto/updateUser.dto";
import {ValueNotFound} from "../Core/exceptions/valueNotFound";
import axios from "axios";

@injectable()
export class UserService {
    
    baseUrl = 'http://localhost:27016/attendances';
    
    constructor(
        @inject(UserTypes.userRepository) private readonly userRepository: UserRepository,
) {
    }

    async createUser(request: PrimitiveUserData) {
        const data = {
            name: request.name,
            alias: request.alias,
            attendance: 0,
        }
        const user = new User(data);
        return await this.userRepository.createUser(user);
    }

    async updateUser(request: UpdateUserDto) {
        const user = await this.userRepository.findUser(request.userId);
        
        if (!user) {
            throw new ValueNotFound(`User with ID: ${request.userId} does not exist!`);
        }
        
        if(request.attendance !== undefined){
            user.attendance = request.attendance
        }
        await this.userRepository.saveUser(user);
        return user;
    }

    async getUser(id: string) {
        const user = await this.userRepository.findUser(id);
        if (!user) {
            throw new ValueNotFound(`User with ID: ${id} does not exist!`);
        }
        try {
            const { data } = await axios(`${this.baseUrl}/${user.id}`);
            user.attendance = data.data;
        } catch (e) {
            console.log(e);
        }
        return user;
    }

    async getAllUsers(name?: string, alias?: string) {
        const users = await this.userRepository.findAllUsers(name, alias);
        if(!users){
            throw new ValueNotFound(`There are no Users!`);
        }
        return users
    }

    async deleteUser(id: string) {
        const user = await this.getUser(id);
        try {
            await axios(`${this.baseUrl}/${user.id}`, {method: "DELETE"});
        } catch (e) {
            console.log(e);
        }
        await this.userRepository.deleteUser(user.id);

        /*
                const message: Communication = {
                    message: {
                        userId: user.id
                    },
                    type: CommunicationType.USER
                }
                const sender = await SenderService.getInstance();
                await sender.sendMessage(message);
        */
    }
}