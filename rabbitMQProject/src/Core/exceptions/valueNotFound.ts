import {ErrorHandler} from "../errorHandler";

export class ValueNotFound extends ErrorHandler {
    constructor(message: string, status?: number) {
        super(404, message);
    }
}