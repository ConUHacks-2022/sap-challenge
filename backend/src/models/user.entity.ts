import { ApiProperty } from "@nestjs/swagger";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { AuthCode } from "./authcode.entity";

@Entity("users")
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id: number;

	@Column()
	@ApiProperty()
	email: string;

	@Column()
	@ApiProperty()
	name: string;

	@Column({ nullable: true })
	@ApiProperty()
	address?: string;

	@Column()
	@ApiProperty()
	phone: string;

	@Column()
	@ApiProperty()
	is_admin: boolean;

	@OneToMany(() => AuthCode, (code) => code.user)
	codes: AuthCode[];

	@CreateDateColumn()
	@ApiProperty()
	created_at: Date;

	@UpdateDateColumn()
	@ApiProperty()
	updated_at;
}
