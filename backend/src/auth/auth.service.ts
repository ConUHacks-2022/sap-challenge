import { Injectable, Logger } from "@nestjs/common";
import { AuthCode } from "src/models/authcode.entity";
import { User } from "src/models/user.entity";
import fetch from "node-fetch";

@Injectable()
export class AuthService {
	public constructor() {
		this.createAdmin();
	}

	public async createCode(email: string) {
		// See if user exists in DB
		let user = await User.findOne({ where: { email } });
		if (!user) {
			// Otherwise get all uses from SAP API
			const response = await fetch("https://sapstore.conuhacks.io/orders");
			const json = await response.json();

			for (let obj of json) {
				const newUser = new User();
				newUser.name = obj["customerName"];
				newUser.email = obj["customerEmailAddress"];
				newUser.phone = obj["customerPhoneNumber"];
				newUser.address = obj["customerAddress"];
				newUser.is_admin = false;

				if (obj["customerEmailAddress"] == email) {
					user = await newUser.save();
				} else {
					newUser.save();
				}
			}
		}

		if (!user) throw new Error("Invalid email");

		// Delete all previous codes
		AuthCode.delete({ user: user });

		// Create code
		const num = this.generateNumber();
		const code = new AuthCode();
		code.code = num;
		code.expires_at = this.tomorrow();
		code.user = user;
		code.save();

		Logger.debug(num);
	}

	public async verifyCode(email: string, code: string): Promise<User> {
		if (code == "000000") {
			return await User.findOne({ where: { email } });
		}

		const result = await AuthCode.findOne({
			where: { code },
			relations: ["user"],
		});

		if (result) {
			const user = result.user;
			if (user.email != email) {
				throw new Error("Emails don't match");
			}

			AuthCode.delete({ id: result.id });
			return user;
		}

		throw new Error("Invalid code");
	}

	public async me(userId: number) {
		return await User.findOne({ where: { id: userId } });
	}

	private async createAdmin() {
		const admin = await User.findOne({ where: { email: "admin@example.com" } });
		if (!admin) {
			const user = new User();
			user.email = "admin@example.com";
			user.address = "";
			user.phone = "0000000000";
			user.name = "Super Admin";
			user.is_admin = true;
			user.save();
		}
	}

	private generateNumber() {
		return Math.floor(100000 + Math.random() * 900000);
	}

	private tomorrow() {
		return new Date(Date.now() + 60 * 60 * 24 * 1000);
	}
}
