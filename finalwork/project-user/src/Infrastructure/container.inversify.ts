import {Container} from "inversify";
import {UserService} from "../Services/userService";
import {UserTypes} from "../Services/types";
import UserRepository from "../Repository/userRepository";
import {UserRepositoryTypeorm} from "./typeORM_sqlite/userRepository.typeorm";
import {SenderService} from "../Services/senderService";

export const inversifyContainer = new Container();
inversifyContainer.bind<UserService>(UserTypes.userService).to(UserService);
inversifyContainer.bind<UserRepository>(UserTypes.userRepository).to(UserRepositoryTypeorm);
inversifyContainer.bind<SenderService>(UserTypes.senderService).to(SenderService);
