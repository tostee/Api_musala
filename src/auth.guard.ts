import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { BASIC_TOKENS } from "./memory";
import { ErrorCode } from "./utils/error-code";

@Injectable()
export class BasicAuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest<Request>();
		const token = req.headers.authorization?.replace("Basic ", "") ?? "";
		const valid = BASIC_TOKENS.indexOf(token) >= 0;
		if (!valid) {
			throw new UnauthorizedException({
				message: "Unauthorized",
				code: ErrorCode.unauthorized,
			});
		}
		return true;
	}
}
