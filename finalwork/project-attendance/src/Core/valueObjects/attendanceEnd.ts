import {ValueObjectBase} from "./valueObjectBase";
import {IncorrectValue} from "../exceptions/incorrectValue";

export class AttendanceEnd extends ValueObjectBase {
    constructor(private readonly end: string) {
        super();
        if (end === undefined) {
            throw new IncorrectValue(`The field [end] is missing!`);
        }
    }

    value() {
        return this.end;
    }

}