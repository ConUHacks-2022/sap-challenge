import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AuthCode } from "./models/authcode.entity";
import { User } from "./models/user.entity";
import { OrdersModule } from './orders/orders.module';

@Module({
	imports: [AuthModule, OrdersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

function heelo() {
	console.log(__dirname + "/**/*.entity.{js,ts}");
	return __dirname + "/**/*.entity.{js,ts}";
}
