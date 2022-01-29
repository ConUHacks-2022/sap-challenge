import {
	BaseEntity,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
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

	@ManyToMany(() => Employee, (employee) => employee.schedules)
	@JoinTable()
	employees: Employee[];

	@Column()
	start_time: Date;

	@Column()
	end_time: Date;
}
