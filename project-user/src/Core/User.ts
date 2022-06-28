import {UserName} from "./valueObjects/userName";
import {UserAlias} from "./valueObjects/userAlias";

interface UserData {
    id?: string,
    name: UserName,
    alias: UserAlias,
    attendance: number,
}

export interface PrimitiveUserData{
    id?: string,
    name: string,
    alias: string,
    attendance: number,
}

export class User implements UserData{
    id!: string;
    name: UserName;
    alias: UserAlias;
    attendance: number;
    
    constructor(data: PrimitiveUserData) {
        if(data.id){
            this.id = data.id;
        }
        
        this.name = new UserName(data.name);
        this.alias = new UserAlias(data.alias);
        this.attendance = data.attendance;
        
    }
    
    updateUser(data: UserData){
    }
}