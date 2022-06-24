import * as express from "express";
import {controller, httpGet, httpPost, request, requestParam, response} from "inversify-express-utils";
import {UserTypes} from "../Services/types";
import {UserService} from "../Services/userService";
import {inject} from "inversify";
import {UserMapper} from "./typeORM_sqlite/userMapper";

interface test {
    id: number,
    name: string,
}

@controller('/users')
export class userController {

    constructor(@inject(UserTypes.userService) private userService: UserService) {
    }

    @httpPost("/")
    private async index(@request() req: express.Request, @response() res: express.Response): Promise<string> {
        const data: test = {
            id: 0,
            name: req.body.name,
        }
        const mappedUser = UserMapper.mapToCore(data);
        const user = await this.userService.createUser(mappedUser);
        return "reached";
    }

    @httpGet('/:id')
    private async getUser(@requestParam("id") id: number, @request() req: express.Request, @response() res: express.Response) {
        const user = await this.userService.getUser(id);
        return user ? "found" : "not found";
    }
}