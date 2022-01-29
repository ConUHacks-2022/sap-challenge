import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.model";

@Entity()
export class AuthCode extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (user) => user.codes)
	user: User;

	@Column()
	code: number;

	@Column()
	expires_at: Date;

	@CreateDateColumn()
	created_at: Date;
}
