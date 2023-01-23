import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
} from "@nestjs/common";
import { Response } from "express";

type HttpError = {
	code: any;
	message: any;
	param: any;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();
		const res = exception.getResponse();
		const { code, message, param } = res as HttpError;

		response.status(status).json({ code, message, param });
	}
}
