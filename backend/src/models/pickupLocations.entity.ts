import { Logger } from "@nestjs/common";
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
	@ApiProperty()
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
}
