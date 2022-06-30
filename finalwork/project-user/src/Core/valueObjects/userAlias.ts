import {IncorrectValue} from "../exceptions/incorrectValue";
import {ValueObjectBase} from "./valueObjectBase";

export class UserAlias extends ValueObjectBase {
    constructor(private readonly alias: string) {
        super();
        if(alias === undefined){
            throw new IncorrectValue(`The field [alias] is missing!`);
        }
    }
    
    value() {
        return this.alias;
    }

}