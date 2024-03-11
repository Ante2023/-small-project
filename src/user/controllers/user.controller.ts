import { Request, Response, } from "express"; // usa el Request y el Response de express y no el de node
import { UserService } from "../services/user.service";
import { HttpResponse } from "../../shared/router/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";
export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getUsers(req: Request, res: Response) {
    try {
      const data = await this.userService.findAllUser();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, "No existe Dato ");
      }
      // res.status(200).json(data);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      // console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.findUSerById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe Dato ");
      }
      // res.status(200).json(data);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      // console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async createUser(req: Request, res: Response) {
    const { body } = req;
    try {
      //   const data = await this.userService.createUSer(req.body);
      const data = await this.userService.createUser(body);
      // res.status(200).json(data);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      // console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async updateUser(req: Request, res: Response) {
    const { params, body } = req;
    // const { id } = req.params;
    try {
      //const data = await this.userService.updateUser(id, req.body);
      const data: UpdateResult = await this.userService.updateUser(
        params.id,
        body
      );
      if (!data.affected) {
        /*data.affected===0*/
        return this.httpResponse.NotFound(res, "Hay un error al actualizar");
      }
      // res.status(200).json(data);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      // console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    // const { id } = req.params;
    try {
      const data: DeleteResult = await this.userService.deleteUser(id);
      if (!data.affected) {
        /*data.affected===0*/
        return this.httpResponse.NotFound(res, "Hay un error al borrar");
      }
      // res.status(200).json(data);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      // console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
