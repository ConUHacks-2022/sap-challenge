import { ApiProperty } from "@nestjs/swagger";

// Cookie
export type CookiePayload = {
	userId: number;
};

export class OperationStatus {
	@ApiProperty()
	status: "SUCCESS" | "FAILED" | "ONGOING";

	@ApiProperty()
	errors?: string[] = [];
}

export class CodeRequest {
	@ApiProperty()
	email: string;
}
