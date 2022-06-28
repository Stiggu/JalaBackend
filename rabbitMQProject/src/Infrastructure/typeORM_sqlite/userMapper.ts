import {UserEntity} from "./user.entity";
import {User} from "../../Core/User";

interface requestToDomain {
    name: string;
    alias: string;
    attendance?: number;
}

export class UserMapper {
    static mapToCore(data: UserEntity): User {
        return new User({
            id: data.id,
            name: data.name,
            alias: data.alias,
            attendance: data.attendance,
        })
    }
    
    static requestToDomain(data: requestToDomain): User {
        return new User({
            name: data.name,
            alias: data.alias,
            attendance: 0,
        })
    }
    
    
    static mapToEntity(data: User): UserEntity {
        return {
            id: data.id,
            name: data.name,
            alias: data.alias,
            attendance: data.attendance,
        }
    }
}