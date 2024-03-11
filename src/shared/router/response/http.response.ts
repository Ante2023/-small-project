import { Response } from "express";
enum httpStatus {
  OK = 200,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBAIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpResponse {
  Ok(res: Response, data: any): Response {
    return res
      .status(httpStatus.OK)
      .json({ status: httpStatus.OK, statusMsg: "Success", data: data });
  }
  NotFound(res: Response, data: any): Response {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({
        status: httpStatus.NOT_FOUND,
        statusMsg: "Not Found",
        error: data,
      });
  }
  Unauthorized(res: Response, data: any): Response {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({
        status: httpStatus.UNAUTHORIZED,
        statusMsg: "Unauthorized",
        error: data,
      });
  }
  Forbaidden(res: Response, data: any): Response {
    return res
      .status(httpStatus.FORBAIDDEN)
      .json({
        status: httpStatus.FORBAIDDEN,
        statusMsg: "Forbaidden",
        error: data,
      });
  }
  Error(res: Response, data: any): Response {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        statusMsg: "Internal Server Error",
        error: data,
      });
  }
}
