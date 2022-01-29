import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger } from "@nestjs/common";
import { CookiePayload } from "../util/apiTypes";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: (req) => {
				if (!req || !req.cookies) return null;
				return req.cookies[process.env.COOKIE_NAME];
			},
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(data: CookiePayload) {
		// Check if user is banned etc
		return true;
	}
}
