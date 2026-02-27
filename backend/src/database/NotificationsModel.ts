import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Users } from "./UserModel";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Users, { onDelete: "CASCADE" })
  user!: Users;

  @Column({ type: "text" })
  message!: string;

  @Column({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  link?: string;

  @Column({ default: false })
  isRead!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}