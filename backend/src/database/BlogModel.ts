import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("blog_posts")
export class BlogPost {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  excerpt!: string;

  @Column({ type: "text", nullable: true })
  content!: string;

  @Column()
  author!: string;

  @Column({ nullable: true })
  image!: string;

  @Column()
  category!: string;

  @Column({ nullable: true })
  readTime!: string;

  @Column({ default: false })
  isFeatured!: boolean;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: 0 })
  order!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
