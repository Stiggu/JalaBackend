import {inject, injectable} from "inversify";
import {UserTypes} from "./types";
import UserRepository from "../Repository/userRepository";
import {PrimitiveUserData, User} from "../Core/User";
import {UpdateUserDto} from "./dto/updateUser.dto";
import {ValueNotFound} from "../Core/exceptions/valueNotFound";
import axios from "axios";

@injectable()
export class UserService {
    constructor(@inject(UserTypes.userRepository) private readonly userRepository: UserRepository) {
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
        const data = {
            name: request.name,
            alias: request.alias,
            attendance: request.attendance,
        }
    }

    async getUser(id: string) {
        const user = await this.userRepository.findUser(id);
        if (!user) {
            throw new ValueNotFound(`User with ID: ${id} does not exist!`);
        }
        const { data } = await axios(`http://localhost:27016/attendances/${user.id}`);
        user.attendance = data.data;
        return user;
    }

    async getAllUsers(name?: string, alias?: string) {
        return await this.userRepository.findAllUsers(name, alias);
    }

    async deleteUser(id: string) {
        const user = await this.getUser(id);
        await this.userRepository.deleteUser(user.id);
    }
}