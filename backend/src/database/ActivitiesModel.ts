import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Users } from "./UserModel";

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Users, { nullable: true, onDelete: "SET NULL" })
  user!: Users | null;

  @Column({ nullable: true })
  email?: string; // Email of the actor, stored directly for audit trail

  @Column()
  action!: string; // e.g. "Created Product", "Deleted Service"

  @Column({ nullable: true })
  targetId!: string; // ID of affected resource

  @Column({ nullable: true })
  targetType!: string; // e.g. "Product", "Service", "Users"

  @Column({ type: "text", nullable: true })
  details!: string; // Optional metadata

  @CreateDateColumn()
  createdAt!: Date;
}
