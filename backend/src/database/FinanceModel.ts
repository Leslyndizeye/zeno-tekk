import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("finance_entries")
export class FinanceEntry {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 16 })
  type!: "income" | "expense";

  @Column({ type: "decimal", precision: 14, scale: 2 })
  amount!: number;

  @Column()
  label!: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "date" })
  date!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
