import { Body, Controller, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { CodeRequest, OperationStatus } from "src/util/apiTypes";
import { User } from "../models/user.entity";
import { AuthService } from "./auth.service";

@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
	constructor(
		private jwtService: JwtService,
		private readonly authService: AuthService
	) {}

	@Post("sendCode")
	@ApiResponse({ type: OperationStatus })
	public async sendCode(@Body() body: CodeRequest): Promise<OperationStatus> {
		try {
			await this.authService.createCode(body.email);

			return {
				status: "SUCCESS",
			};
		} catch (e) {
			return {
				status: "FAILED",
				errors: [(<Error>e).message],
			};
		}
	}

	private createAuthCookie(user: User, response: Response): void {
		const userId = user.id;
		const payload = { userId: userId };
		const token = this.jwtService.sign(payload);

		response
			.cookie(process.env.COOKIE_NAME, token, {
				httpOnly: true,
				domain: process.env.BACKEND_HOST_NAME, // your domain here!
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
			})
			.send({ user, errors: [] });
	}
}
