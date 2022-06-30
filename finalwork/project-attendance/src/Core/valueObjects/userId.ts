import {ValueObjectBase} from "./valueObjectBase";
import {IncorrectValue} from "../exceptions/incorrectValue";

export class UserId extends ValueObjectBase {
    constructor(private readonly userId: string) {
        super();
        if (userId === undefined) {
            throw new IncorrectValue(`The field [userId] is missing!`);
        }
    }

    value() {
        return this.userId;
    }

}