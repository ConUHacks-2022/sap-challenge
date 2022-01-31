/**
 *
 */

import { IUser } from "../interfaces/user";

export async function getUser() {
	const response = await getRequest("auth/me");
	return await response.json();
}

export function toFormikErrors(errors: any) {
	const errorMap: Record<string, string> = {};
	for (const field in errors) {
		errorMap["email"] = field;
	}
	return errorMap;
}

export function apiUrl() {
	return process.env.NEXT_PUBLIC_BACKEND_URL + "/";
}

export async function postRequest(
	relativeURL: string,
	payload?: Record<string, any>
) {
	return await fetch(apiUrl() + relativeURL, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});
}

export async function getRequest(relativeURL: string) {
	return await fetch(apiUrl() + relativeURL, {
		credentials: "include",
	});
}

export async function deleteRequest(
	relativeURL: string,
	payload?: Record<string, string>
) {
	return await fetch(apiUrl() + relativeURL, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});
}
