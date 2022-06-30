import {RelationalDataSource} from "./Infrastructure/typeORM_sqlite/dataSource";
import {InversifyExpressServer} from "inversify-express-utils";
import "./Infrastructure/userController";
import * as bodyParser from "body-parser";
import {inversifyContainer} from "./Infrastructure/container.inversify";
import {ErrorHandler} from "./Core/errorHandler";
import {Request, Response} from "express";
import {ResponseHandler} from "./Core/responseHandler";
import {HttpStatusCode} from "./Core/types";

const PORT = 27015;

const server = new InversifyExpressServer(inversifyContainer);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});

RelationalDataSource.initialize()
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