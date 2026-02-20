import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Testimonial {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  clientName!: string;

  @Column()
  clientCompany!: string;

  @Column()
  content!: string;

  @Column({ nullable: true })
  clientImage?: string; // URL to client image

  @Column({ type: "decimal", precision: 2, scale: 1, default: 5 })
  rating!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: 0 })
  order!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
