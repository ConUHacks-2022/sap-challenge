import { ApiProperty } from "@nestjs/swagger";
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
import { Order } from "./order.entity";
import { PickupLocation } from "./pickupLocations.entity";

@Entity()
export class Schedule extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => PickupLocation, (location) => location.schedules)
	@ApiProperty({ type: PickupLocation })
	pickup_location: PickupLocation;

	@ManyToMany(() => Employee, (employee) => employee.schedules)
	@JoinTable()
	employees: Employee[];

	@OneToOne(() => Order, (order) => order.schedule, {
		onDelete: "CASCADE", // <---- HERE
	})
	order: Order;

	@Column()
	@ApiProperty()
	start_time: Date;

	@Column()
	@ApiProperty()
	end_time: Date;
}
