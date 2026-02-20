import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Stat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  label!: string;

  @Column()
  value!: string; // Can be "500+", "50K+", etc.

  @Column({ nullable: true })
  description?: string;

  @Column({ default: 0 })
  order!: number;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
