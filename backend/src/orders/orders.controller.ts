import { Controller, Get, Logger, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Order } from "src/models/order.entity";
import { AuthUser } from "src/util/decorators";
import { OrdersService } from "./orders.service";

@Controller("orders")
@ApiTags("Orders")
@UseGuards(AuthGuard("jwt"))
export class OrdersController {
	constructor(private readonly ordersController: OrdersService) {}

	@Get("all")
	@ApiResponse({ type: [Order] })
	public async all(@AuthUser() userId: number) {
		return this.ordersController.all(userId).catch((e) => Logger.error(e));
	}

	@Get("/:id")
	@ApiResponse({ type: [Order] })
	public async getById(@AuthUser() userId: number, @Param("id") id: number) {
		return await Order.findOne({ where: { id } });
	}
}
