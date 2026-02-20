import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  category!: string; // Web, Mobile, AI/ML, etc.

  @Column()
  image!: string; // URL to image

  @Column({ nullable: true })
  url?: string; // External link to project

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: 0 })
  order!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
