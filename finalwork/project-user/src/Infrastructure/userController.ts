import * as express from "express";
import {
    controller,
    httpDelete,
    httpGet,
    httpPost, httpPut,
    queryParam,
    request,
    requestParam,
    response
} from "inversify-express-utils";
import {UserTypes} from "../Services/types";
import {UserService} from "../Services/userService";
import {inject} from "inversify";
import {ResponseHandler} from "../Core/responseHandler";
import {UpdateUserDto} from "../Services/dto/updateUser.dto";
import {ElasticSearch} from "./elasticSearch";
import {UserMapper} from "./typeORM_sqlite/userMapper";
import {User} from "../Core/User";

@controller('/users')
export class userController {

    constructor(@inject(UserTypes.userService) private userService: UserService,
    @inject(UserTypes.userSearch) private elasticSearch: ElasticSearch) {
    }

    @httpGet("/")
    private async getUserList(@queryParam("query") query: string, 
                              @request() req: express.Request, 
                              @response() res: express.Response){
        const userList = await this.userService.getAllUsers(query);
        if(query){
            const search = await this.elasticSearch.searchUsers(query);
            console.log(search)
            const response = search.map((user: User) => UserMapper.elasticToCore(user))
            return ResponseHandler.success(res, response);
        }
        return ResponseHandler.success(res, userList);
    }
    
    @httpPut('/')
    private async updateUser(
        @request() req: express.Request,
        @response() res: express.Response
    ){
        const data: UpdateUserDto = {
            userId: req.body.userId,
            attendance: req.body.attendance
        }
        const user = await this.userService.updateUser(data);
        return ResponseHandler.success(res, user);
    }

    @httpPost("/")
    private async createUser(@request() req: express.Request, @response() res: express.Response) {
        const data = {
            name: req.body.name,
            alias: req.body.alias,
            attendance: 0,
        }
        const user = await this.userService.createUser(data);
        const elasticData = {
            name: user.name,
            alias: user.alias,
            attendance: user.attendance,
            id: user.id,
        }
        await this.elasticSearch.elasticClient.index({
            index: 'users',
            id: elasticData.id,
            body: elasticData
        })
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
        const search = await this.elasticSearch.searchUsers(id);
        const _id = search[0]._id;
        await this.elasticSearch.elasticClient.delete({
            index: 'users',
            id: _id
        });
        return ResponseHandler.deleted(res);
    }
}