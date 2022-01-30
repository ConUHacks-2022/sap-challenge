import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import {
	AuthResponse,
	CodeRequest,
	CodeVerificationRequest,
	MeResponse,
	OperationStatus,
} from "../util/apiTypes";
import { AuthUser } from "../util/decorators";
import { User } from "../models/user.entity";
import { AuthService } from "./auth.service";
import twilio from "twilio";

const accountSid = process.env.ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
const client = twilio(accountSid, authToken);

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
			const { code, user } = await this.authService.createCode(body.email);
			await client.messages.create({
				body:
					"You got code from ConUHacks2022 eCommerce Shadi and Noah application. Your code is: " +
					code,
				to: "+1" + user.phone, // Text this number
				from: "+15878495075", // From a valid Twilio number
			});

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

	@Post("verifyCode")
	@ApiResponse({ type: AuthResponse })
	public async verifyCode(
		@Body() body: CodeVerificationRequest,
		@Res() response: Response
	): Promise<void> {
		try {
			const user = await this.authService.verifyCode(body.email, body.code);
			this.createAuthCookie(user, response);
		} catch (e) {
			response.send({
				status: "FAILED",
				errors: [(<Error>e).message],
				user: null,
			});
		}
	}

	@Get("me")
	public async me(@AuthUser() userId: number): Promise<MeResponse> {
		try {
			return {
				user: await this.authService.me(userId),
			};
		} catch (e) {
			return {
				user: null,
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
			.send({
				status: "SUCCESS",
				user: user,
			});
	}
}
