interface UserData {
    id?: number,
    name: string,
}

export class User{
    id!: number;
    name: string;
    
    constructor(data: UserData) {
        if(data.id){
            this.id = data.id;
        }
        
        this.name = data.name;
    }
}