import { ApiProperty } from "@nestjs/swagger";
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "./employee.entity";
import { PickupLocation } from "./pickupLocations.entity";

@Entity()
export class Store extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@ApiProperty()
	sap_id: number;

	@Column()
	@ApiProperty()
	name: string;

	@Column()
	@ApiProperty()
	phone: string;

	@Column()
	@ApiProperty()
	address: string;

	@Column({ default: "", length: 5000 })
	@ApiProperty()
	openingHours: string;

	@OneToMany(() => PickupLocation, (location) => location.store)
	@ApiProperty({ type: [PickupLocation] })
	pickup_locations: PickupLocation[];

	@OneToMany(() => Employee, (employee) => employee.store)
	@ApiProperty({ type: [Employee] })
	employees: Employee[];
}
