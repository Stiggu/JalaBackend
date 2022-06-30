import express from "express";
import {response} from "inversify-express-utils";
import {HttpStatusCode} from "./types";

export class ResponseHandler {
    static success<T>(@response() res: express.Response, data: T){
        res.status(HttpStatusCode.SUCCESS)
            .json({
            status: HttpStatusCode.SUCCESS,
                data: data,
        });
    }
    static created<T>(@response() res: express.Response, data: T) {
        res.status(HttpStatusCode.CREATED)
            .json({
            status: HttpStatusCode.CREATED,
            data: data,
        })
    }
    static deleted<T>(@response() res: express.Response){
        res.status(HttpStatusCode.NO_CONTENT)
    }
    static genericResponse<T>(@response() res: express.Response, status: HttpStatusCode, message: string){
        res.status(status)
            .json({
                status: status,
                message: message,
            })
    }
}