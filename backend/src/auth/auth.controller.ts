import { Controller } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { User } from "../models/user.model";

@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
	constructor(private jwtService: JwtService) {}

	public async login() {}

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
