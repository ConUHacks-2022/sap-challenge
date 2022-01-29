import { Injectable, Logger } from "@nestjs/common";
import { use } from "passport";
import { Order } from "../models/order.entity";
import { User } from "../models/user.entity";
import fetch from "node-fetch";
import { Store } from "src/models/store.entity";
import { PickupLocation } from "src/models/pickupLocations.entity";
import { Employee } from "src/models/employee.entity";
import { Schedule } from "src/models/sechule";
import e from "express";
import { BookPickupsRequest } from "src/util/apiTypes";

@Injectable()
export class StoresService {
	constructor() {
		this.syncStores();
	}

	public async all() {
		return await Store.find();
	}

	public async availablePickups(
		userId: number,
		order_id: number,
		store_id: number,
		time: Date
	) {
		//const user = await User.findOne({ where: { id: userId } });
		const order = await Order.findOne({ where: { id: order_id } });
		const store = await Store.findOne({
			where: { id: store_id },
			relations: ["pickup_locations", "employees"],
		});

		// All the restriction here
		const result: PickupLocation[] = [];

		const employeesNeeded = order.parcel_size == "L" ? 2 : 1;
		for (const location of store.pickup_locations) {
			if (
				(await this.availableEmployees(store, order, time)).length >=
					employeesNeeded &&
				location.parcel_size == order.parcel_size &&
				location.isAvaible(time, order)
			) {
				result.push(location);
			}
		}

		return result;
	}

	public async book(userId: number, body: BookPickupsRequest) {}

	private async availableEmployees(
		store: Store,
		order: Order,
		start: Date
	): Promise<Employee[]> {
		const result = [];

		// Remove 5 min from start
		let startDate = new Date(start);
		startDate.setMinutes(startDate.getMinutes() - 5);

		let endDate = new Date(start);
		endDate.setMinutes(
			endDate.getMinutes() + Number(order.preparation_time) + 5
		);

		for (const employee of store.employees) {
			let employeeWithSechdule = await Employee.findOne({
				where: { id: employee.id },
				relations: ["schedules"],
			});
			const sechules = employeeWithSechdule.schedules;

			if (sechules.length == 0) {
				result.push(employee);
			} else {
				for (const sechule of sechules) {
					if (
						!(
							startDate.getDate() > sechule.start_time.getDate() &&
							startDate.getDate() < endDate.getDate()
						)
					) {
						result.push(employee);
						break;
					}
				}
			}
		}
		return result;
	}

	private async syncStores() {
		Logger.debug("Syncing Stores");

		// Get all orders
		const response = await fetch("https://sapstore.conuhacks.io/stores");
		const json = await response.json();

		for (const obj of json) {
			try {
				// See if the order exists
				const store = await Store.findOne({
					where: { sap_id: Number(obj["storeId"]) },
				});

				if (!store) {
					const newStore = new Store();
					newStore.sap_id = obj["storeId"];
					newStore.name = obj["name"];
					newStore.address = obj["address"];
					newStore.phone = obj["phoneNumber"];
					newStore.openingHours = JSON.stringify(obj["openingHours"]);
					await newStore.save();

					const locations = obj["pickupLocations"];

					for (const loc of locations) {
						const location = new PickupLocation();
						location.sap_id = loc["id"];
						location.name = loc["name"];
						location.parcel_size = loc["parcelSize"];
						location.store = newStore;
						location.save();
					}

					const employees = obj["employees"];
					for (const em of employees) {
						const employee = new Employee();
						employee.sap_id = em["id"];
						employee.name = em["name"];
						employee.store = newStore;
						employee.save();
					}
				}
			} catch (e) {
				Logger.error(e);
			}
		}
	}
}
