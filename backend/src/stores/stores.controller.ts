import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PickupLocation } from "src/models/pickupLocations.entity";
import { Store } from "src/models/store.entity";
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

	@Get("availablePickups")
	@ApiResponse({ type: [PickupLocation] })
	@UseGuards(AuthGuard("jwt"))
	public async availablePickups(
		@AuthUser() userId: number,
		@Query("order_id") order_id: number,
		@Query("store_id") store_id: number
	) {
		return await this.storesService.availablePickups(
			userId,
			order_id,
			store_id,
			new Date()
		);
	}
}
