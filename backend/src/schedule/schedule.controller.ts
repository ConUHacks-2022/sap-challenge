import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Schedule } from "src/models/sechule";
import { AuthUser } from "src/util/decorators";
import { BaseEntity, Entity } from "typeorm";

@Controller("schedule")
@ApiTags("schedule")
export class ScheduleController {
	@Get("")
	@UseGuards(AuthGuard("jwt"))
	@ApiResponse({ type: [Schedule] })
	public async all(@AuthUser() userId: number) {
		return await Schedule.find({ relations: ["employees", "pickup_location"] });
	}

	@Get("/:id")
	@UseGuards(AuthGuard("jwt"))
	@ApiResponse({ type: Schedule })
	public async getById(@AuthUser() userId: number, @Param("id") id: number) {
		return await Schedule.findOne({ where: { id } });
	}

	@Delete("/:id")
	@UseGuards(AuthGuard("jwt"))
	public async delete(@AuthUser() userId: number, @Param("id") id: number) {
		return await Schedule.delete({ id });
	}
}
