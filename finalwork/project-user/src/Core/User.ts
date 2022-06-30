import {UserName} from "./valueObjects/userName";
import {UserAlias} from "./valueObjects/userAlias";

interface UserData {
    id?: string,
    name: UserName,
    alias: UserAlias,
    attendance: number,
    attendances?: string[]
}

export interface PrimitiveUserData{
    id?: string,
    name: string,
    alias: string,
    attendance: number,
    attendances?: string[]
}

export class User implements UserData{
    id!: string;
    name: UserName;
    alias: UserAlias;
    attendance: number;
    attendances!: string[];
    
    constructor(data: PrimitiveUserData) {
        this.name = new UserName(data.name);
        this.alias = new UserAlias(data.alias);
        this.attendance = data.attendance;

        if(data.id){
            this.id = data.id;
        }

        if(data.attendances){
            this.attendances = data.attendances;
        }
    }
    
    updateUser(data: UserData){
    }
}