import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PickupLocation } from "src/models/pickupLocations.entity";
import { Store } from "src/models/store.entity";
import { AvailablePickupsRequest } from "src/util/apiTypes";
import { AuthUser } from "src/util/decorators";
import { StoresService } from "./stores.service";

@Controller()
@ApiTags("Stores")
export class StoresController {
	public constructor(private readonly storesService: StoresService) {}

	@Get("all")
	@ApiResponse({ type: [Store] })
	public async all() {
		return await this.storesService.all();
	}

	@Post("availablePickups")
	@ApiResponse({ type: [PickupLocation] })
	@UseGuards(AuthGuard("jwt"))
	public async availablePickups(
		@AuthUser() userId: number,
		@Body() body: AvailablePickupsRequest
	) {
		return await this.storesService.availablePickups(
			userId,
			body.order_id,
			body.store_id,
			body.desired_time
		);
	}
}
