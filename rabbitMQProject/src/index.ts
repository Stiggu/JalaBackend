import {RelationalDataSource} from "./Infrastructure/typeORM_sqlite/dataSource";
import {InversifyExpressServer} from "inversify-express-utils";
import {Container} from "inversify";
import {UserService} from "./Services/userService";
import {UserTypes} from "./Services/types";
import "./Infrastructure/userController";
import UserRepository from "./Repository/userRepository";
import {UserRepositoryTypeorm} from "./Infrastructure/typeORM_sqlite/userRepository.typeorm";
import * as bodyParser from "body-parser";

const PORT = 27015;

const container = new Container();
container.bind<UserService>(UserTypes.userService).to(UserService);
container.bind<UserRepository>(UserTypes.userRepository).to(UserRepositoryTypeorm);

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});
RelationalDataSource.initialize()
    .then(() => {
        const app = server.build();
        app.listen(PORT);
        console.log(`Server listening on: http://localhost:${PORT}`)
    })
    .catch(e => console.log(e));