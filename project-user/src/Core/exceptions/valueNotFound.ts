import {ErrorHandler} from "../errorHandler";
import {HttpStatusCode} from "../types";

export class ValueNotFound extends ErrorHandler {
    constructor(message: string, status?: number) {
        super(HttpStatusCode.NOT_FOUND, message);
    }
}