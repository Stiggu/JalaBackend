import {ErrorHandler} from "../errorHandler";
import {HttpStatusCode} from "../types";

export class IncorrectValue extends ErrorHandler{
    
    constructor(message: string) {
        super(HttpStatusCode.BAD_REQUEST, message);
    }
}