import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { CookiePayload } from "./apiTypes";

/**
 * @example Use this function as decorator on top of controller functions
 * @returns Returns the logged in user
 */
export const AuthUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = <Request>ctx.switchToHttp().getRequest();

		if (request.cookies[process.env.COOKIE_NAME]) {
			const payload = <CookiePayload>(
				parseJwt(request.cookies[process.env.COOKIE_NAME])
			);

			return payload.userId;
		} else {
			return -1;
		}
	}
);

/**
 * Parses the JWT token sent as cookie
 * @param token The token to parse
 * @returns Returns the json object with the JWT data
 */
function parseJwt(token) {
	var base64Url = token.split(".")[1];
	var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	var jsonPayload = decodeURIComponent(
		Buffer.from(base64, "base64")
			.toString()
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);

	return JSON.parse(jsonPayload);
}
