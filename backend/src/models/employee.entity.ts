import { ApiProperty } from "@nestjs/swagger";
import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Schedule } from "./sechule";
import { Store } from "./store.entity";

@Entity()
export class Employee extends BaseEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id: number;

	@Column()
	sap_id: number;

	@Column()
	name: string;

	@ManyToOne(() => Store, (store) => store.employees)
	store: Store;

	@ManyToMany(() => Schedule, (e) => e.employees)
	schedules: Schedule[];
}
