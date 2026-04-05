import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class HeroContent {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  subtitle!: string;

  @Column()
  description!: string;

  @Column({ default: "Explore Services" })
  ctaButton1Text!: string;

  @Column({ default: "/services" })
  ctaButton1Url!: string;

  @Column({ default: "View Our Work" })
  ctaButton2Text!: string;

  @Column({ default: "/products" })
  ctaButton2Url!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
