import "reflect-metadata";
require("dotenv-safe").config({ allowEmptyValues: true });
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: process.env.FRONTEND_URL,
			credentials: true,
		},
	});
	const config = new DocumentBuilder()
		.setTitle("eCommerce Pickup Service")
		.setDescription("The eCommerce Pickup Service API description")
		.setVersion("1.0")
		.addTag("")
		.addServer(process.env.BACKEND_HOST)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);
	app.use(cookieParser());
	await app.listen(56000);
}
bootstrap();
