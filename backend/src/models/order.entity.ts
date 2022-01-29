import { ApiProperty } from "@nestjs/swagger";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("orders")
export class Order extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@ApiProperty()
	sap_id: number;

	@Column()
	@ApiProperty()
	preparation_time: string;

	@Column()
	@ApiProperty()
	parcel_size: "L" | "M" | "S";

	@Column({ default: "", length: 5000 })
	@ApiProperty()
	entries: string;

	@ManyToOne(() => User, (user) => user.orders, { nullable: true })
	user: User;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
