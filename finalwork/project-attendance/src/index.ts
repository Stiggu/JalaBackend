import "reflect-metadata";
import bodyParser from "body-parser";
import {InversifyExpressServer} from "inversify-express-utils";
import {inversifyContainer} from "./Infrastructure/container.inversify";
import {NoRelationsDataSource} from "./Infrastructure/typeORM_mongo/dataSource";
import {ErrorHandler} from "./Core/errorHandler";
import {ResponseHandler} from "./Core/responseHandler";
import {HttpStatusCode} from "./Core/types";
import {Request, Response} from "express";
import "./Infrastructure/attendanceController";

const PORT = 27016;

const server = new InversifyExpressServer(inversifyContainer);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});

NoRelationsDataSource.initialize()
    .then(() => {
        const app = server.build();

        app.use((err: ErrorHandler, req: Request, res: Response, next: CallableFunction) => {
            ResponseHandler.genericResponse(
                res,
                err.status || HttpStatusCode.INTERNAL_ERROR,
                err.message || "Internal server Error"
            )
        })

        app.listen(PORT);
        console.log(`Server listening on: http://localhost:${PORT}`)
    })
    .catch(e => console.log(e));