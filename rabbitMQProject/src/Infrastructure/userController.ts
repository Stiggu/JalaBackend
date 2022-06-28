﻿import * as express from "express";
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    queryParam,
    request,
    requestParam,
    response
} from "inversify-express-utils";
import {UserTypes} from "../Services/types";
import {UserService} from "../Services/userService";
import {inject} from "inversify";
import {UserMapper} from "./typeORM_sqlite/userMapper";
import {ResponseHandler} from "../Core/responseHandler";

@controller('/users')
export class userController {

    constructor(@inject(UserTypes.userService) private userService: UserService) {
    }

    @httpGet("/")
    private async getUserList(@queryParam("name") name: string, 
                              @queryParam("alias") alias: string, 
                              @request() req: express.Request, 
                              @response() res: express.Response){
        const userList = await this.userService.getAllUsers(name, alias);
        return ResponseHandler.success(res, userList);
    }

    @httpPost("/")
    private async createUser(@request() req: express.Request, @response() res: express.Response) {
        const data = {
            name: req.body.name,
            alias: req.body.alias,
        }
        const mappedUser = UserMapper.requestToDomain(data);
        const user = await this.userService.createUser(mappedUser);
        return ResponseHandler.created(res, user);
    }
    
    @httpGet('/:id')
    private async getUser(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        const user = await this.userService.getUser(id);
        return ResponseHandler.success(res, user);
    }

    @httpDelete('/:id')
    private async deleteUser(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        await this.userService.deleteUser(id);
        return ResponseHandler.deleted(res, `User by the ID: ${id} has been deleted!`);
    }
}