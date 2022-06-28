interface UserData {
    id?: string,
    name: string,
    alias: string,
    attendance?: number,
}

export class User implements UserData{
    id!: string;
    name: string;
    alias: string;
    attendance?: number;
    
    constructor(data: UserData) {
        if(data.id){
            this.id = data.id;
        }
        
        this.name = data.name;
        this.alias = data.alias;
        
        if(this.attendance){
            this.attendance = data.attendance;
        }
    }
    
    updateUser(data: UserData){
        
    }
}