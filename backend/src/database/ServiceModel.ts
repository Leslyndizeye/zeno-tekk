import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  icon!: string; // Icon name from lucide-react

  @Column({ type: "text", array: true, default: () => "ARRAY[]::text[]" })
  features!: string[];

  @Column({ type: "text", nullable: true, default: null })
  learnMore!: string | null;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: 0 })
  order!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
