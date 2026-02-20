import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TeamMember {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  position!: string; // CEO, CTO, Manager, etc.

  @Column({ nullable: true })
  bio?: string;

  @Column()
  image!: string; // URL to image

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  linkedin?: string;

  @Column({ nullable: true })
  twitter?: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: 0 })
  order!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
