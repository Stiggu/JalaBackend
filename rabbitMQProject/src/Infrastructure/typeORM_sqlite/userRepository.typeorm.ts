import UserRepository from "../../Repository/userRepository";
import {injectable} from "inversify";
import {Repository} from "typeorm";
import {UserEntity} from "./user.entity";
import {RelationalDataSource} from "./dataSource";
import {User} from "../../Core/User";
import {UserMapper} from "./userMapper";

@injectable()
export class UserRepositoryTypeorm implements UserRepository {
    private readonly repo: Repository<UserEntity>;
    
    constructor() {
        this.repo = RelationalDataSource.getRepository(UserEntity);
    }
    
    async findUser(id: number): Promise<User | undefined> {
        const user = await this.repo.findOne({
            where: {
                id: id,
            }
        });
        return user ? UserMapper.mapToCore(user) : undefined;
    }

    createUser(user: User): Promise<User> {
        const mappedUser = UserMapper.mapToEntity(user);
        return this.repo.save(mappedUser);
    }
    
}