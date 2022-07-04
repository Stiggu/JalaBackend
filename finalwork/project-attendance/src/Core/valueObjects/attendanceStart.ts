import {ValueObjectBase} from "./valueObjectBase";
import {IncorrectValue} from "../exceptions/incorrectValue";

export class AttendanceStart extends ValueObjectBase {
    constructor(private readonly start: string) {
        super();
        if (start === undefined) {
            throw new IncorrectValue(`The field [start] is missing!`);
        }
    }

    value() {
        return this.start;
    }

}