import {Container} from "inversify";
import {UserService} from "../Services/userService";
import {UserTypes} from "../Services/types";
import UserRepository from "../Repository/userRepository";
import {UserRepositoryTypeorm} from "./typeORM_sqlite/userRepository.typeorm";

export const inversifyContainer = new Container();
inversifyContainer.bind<UserService>(UserTypes.userService).to(UserService);
inversifyContainer.bind<UserRepository>(UserTypes.userRepository).to(UserRepositoryTypeorm);

// export default inversifyContainer;