import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/models/user.entity";

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

export class CodeVerificationRequest {
	@ApiProperty()
	code: number;
}

export class AuthResponse extends OperationStatus {
	@ApiProperty({ type: User })
	user: User;
}
