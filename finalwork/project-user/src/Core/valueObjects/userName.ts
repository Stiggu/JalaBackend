import {IncorrectValue} from "../exceptions/incorrectValue";
import {ValueObjectBase} from "./valueObjectBase";

export class UserName extends ValueObjectBase{
    constructor(private readonly name: string) {
        super();
        if(name === undefined){
            throw new IncorrectValue(`The field [name] is missing!`);
        }
    }
    
    value() {
        return this.name;
    }
}