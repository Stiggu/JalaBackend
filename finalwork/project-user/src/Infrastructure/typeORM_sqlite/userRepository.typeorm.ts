import UserRepository from "../../Repository/userRepository";
import {injectable} from "inversify";
import {Repository} from "typeorm";
import {UserEntity} from "./user.entity";
import {RelationalDataSource} from "./dataSource";
import {User} from "../../Core/User";
import {UserMapper} from "./userMapper";
import {ValueNotFound} from "../../Core/exceptions/valueNotFound";

@injectable()
export class UserRepositoryTypeorm implements UserRepository {
    constructor(
        private readonly repo: Repository<UserEntity> = RelationalDataSource.getRepository(UserEntity)
    ) {
    }

    async findAllUsers(name?: string, alias?: string): Promise<User[] | undefined> {
        const users = await this.repo.findBy({
            name: name,
            alias: alias,
        });
        return users.length !== 0 ? users.map(user => UserMapper.mapToCore(user)) : undefined;
    }

    async findUser(id: string): Promise<User | undefined> {
        const user = await this.repo.findOne({
            where: {
                id: id,
            }
        });

        return user ? UserMapper.mapToCore(user) : undefined;
    }

    async createUser(user: User): Promise<User> {
        const mappedUser = UserMapper.mapToEntity(user);
        const userEntity = await this.repo.save(mappedUser);
        return UserMapper.mapToCore(userEntity);
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.repo.findOne({
            where: {
                id: id,
            }
        })

        if (!user) {
            throw new ValueNotFound(`User with ID: ${id} does not exist!`);
        }

        await this.repo.remove(user);
    }

    async saveUser(user: User) {
        const mapperUser = UserMapper.mapToEntity(user);
        await this.repo.save(mapperUser);
    }
    
    

}