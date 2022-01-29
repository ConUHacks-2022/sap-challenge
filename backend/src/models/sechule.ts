import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "./employee.entity";
import { PickupLocation } from "./pickupLocations.entity";

@Entity()
export class Schedule extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => PickupLocation, (location) => location.schedules)
	pickup_location: PickupLocation;

	@OneToMany(() => Employee, (employee) => employee.schedule)
	employees: Employee[];

	@Column()
	start_time: Date;

	@Column()
	end_time: Date;
}
