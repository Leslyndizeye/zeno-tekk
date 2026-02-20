import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { IsBoolean } from "class-validator";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ default: false })
  @IsBoolean()
  disabled!: boolean;

  @Column({ default: false })
  @IsBoolean()
  twostepv!: boolean;

  @Column({ type: 'varchar', nullable: true, length: 64 })
  resetPasswordToken?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  resetPasswordExpires?: Date | null;

  @Column({ nullable: true })
  profilePicUrl?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
