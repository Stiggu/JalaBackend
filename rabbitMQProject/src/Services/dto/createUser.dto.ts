import {Expose} from "class-transformer";

export class CreateUserDto {
    @Expose()
    id!: number;
    
    @Expose()
    name!: string;
}