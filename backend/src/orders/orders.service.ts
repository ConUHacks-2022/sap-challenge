import { Injectable, Logger } from "@nestjs/common";
import { use } from "passport";
import { Order } from "../models/order.entity";
import { User } from "../models/user.entity";
import fetch from "node-fetch";

@Injectable()
export class OrdersService {
	constructor() {
		this.syncOrders();
	}

	public async all(userId: number) {
		await this.syncOrders();
		return await Order.find({
			where: { user: { id: userId } },
			relations: ["schedule"],
		});
	}

	private async syncOrders() {
		Logger.debug("Syncing Orders");

		// Get all orders
		const response = await fetch("https://sapstore.conuhacks.io/orders");
		const json = await response.json();

		for (const obj of json) {
			// See if the order exists
			const order = await Order.findOne({
				where: { sap_id: Number(obj["orderId"]) },
			});

			if (!order) {
				const newOrder = new Order();
				newOrder.sap_id = obj["orderId"];
				newOrder.parcel_size = obj["parcelSize"];
				newOrder.preparation_time = obj["preparationTime"];
				newOrder.entries = JSON.stringify(obj["orderEntries"]);
				let user = await User.findOne({
					where: { email: obj["customerEmailAddress"] },
				});

				// If user not found then create it
				if (!user) {
					const newUser = new User();
					newUser.name = obj["customerName"];
					newUser.email = obj["customerEmailAddress"];
					newUser.phone = obj["customerPhoneNumber"];
					newUser.address = obj["customerAddress"];
					newUser.is_admin = false;
					user = await newUser.save();
				}

				newOrder.user = user;
				newOrder.save();
			}
		}
	}
}
