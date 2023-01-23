import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cors from "cors";
import { AppModule } from "./app.module";
import { ErrorValidationPipe } from "./utils/error-validator.pipe";
import { HttpExceptionFilter } from "./utils/http-exception.filter";

async function bootstrap() {
	const PORT = process.env.PORT || 5000;
	const logger = new Logger("App");

	const app = await NestFactory.create(AppModule);
	app.use(cors({ origin: "*" }));
	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalPipes(new ErrorValidationPipe());

	await app.listen(PORT, () => {
		logger.log(`Server is listening at http://localhost:${PORT}`);
	});
}
bootstrap();
