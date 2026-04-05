import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from "typeorm";

@Entity("page_views")
export class PageView {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index()
  page!: string;

  @Column({ nullable: true, length: 255 })
  referrer?: string;

  @Column({ nullable: true, length: 512 })
  userAgent?: string;

  @Column({ nullable: true, length: 64 })
  ip?: string;

  @Column({ length: 64 })
  @Index()
  sessionId!: string;

  @Column({ nullable: true, length: 32 })
  browser?: string;

  @Column({ nullable: true, length: 32 })
  os?: string;

  @Column({ nullable: true, length: 16 })
  device?: string;

  @CreateDateColumn()
  @Index()
  createdAt!: Date;
}
