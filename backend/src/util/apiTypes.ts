import { ApiProperty } from "@nestjs/swagger";
import { Schedule } from "src/models/sechule";
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
	code: string;

	@ApiProperty()
	email: string;
}

export class AuthResponse extends OperationStatus {
	@ApiProperty({ type: User })
	user: User;
}

export class MeResponse {
	@ApiProperty({ type: User })
	user: User;
}

export class AvailablePickupsRequest {
	@ApiProperty()
	order_id: number;

	@ApiProperty()
	store_id: number;

	@ApiProperty()
	desired_time: Date;
}

export class BookPickupsRequest {
	@ApiProperty()
	order_id: number;

	@ApiProperty()
	store_id: number;

	@ApiProperty()
	pickup_location_id: number;

	@ApiProperty()
	desired_time: Date;
}

export class BookPickupsResponse extends OperationStatus {
	@ApiProperty({ type: Schedule })
	schedule: Schedule | null;
}
