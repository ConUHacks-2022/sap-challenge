import { ApiProperty } from "@nestjs/swagger";
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { Schedule } from "./sechule";
import { Store } from "./store.entity";

@Entity()
export class PickupLocation extends BaseEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id: number;

	@Column()
	//@ApiProperty()
	sap_id: number;

	@Column()
	@ApiProperty()
	parcel_size: "M" | "L" | "S";

	@Column()
	@ApiProperty()
	name: string;

	@ManyToOne(() => Store, (store) => store.pickup_locations)
	store: Store;

	@OneToMany(() => Schedule, (s) => s.pickup_location)
	schedules: Schedule[];

	public async isAvaible(start: Date, order: Order) {
		const object = await PickupLocation.findOne({
			where: { id: this.id },
			relations: ["schedules"],
		});
		if (object.schedules.length == 0) {
			return true;
		}

		let endDate = new Date(start);
		endDate.setMinutes(
			endDate.getMinutes() + Number(order.preparation_time) + 10
		);

		let noColict = true;
		for (const sechule of object.schedules) {
			if (
				start.getDate() > sechule.start_time.getDate() &&
				start.getDate() < endDate.getDate()
			) {
				noColict = false;
				break;
			}
		}

		return noColict;
	}
}
