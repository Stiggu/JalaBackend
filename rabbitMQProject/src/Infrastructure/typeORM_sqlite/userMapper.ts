import {UserEntity} from "./user.entity";
import {User} from "../../Core/User";

export class UserMapper {
    static mapToCore(data: UserEntity): User {
        return new User({
            id: data.id, 
            name: data.name
        })
    }
    
    static mapToEntity(data: User): UserEntity {
        return {
            id: data.id,
            name: data.name,
        }
    }
}