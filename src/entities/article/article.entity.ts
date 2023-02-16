import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'header',
    type: 'varchar',
  })
  header: string;

  @Column({
    name: 'content',
    type: 'varchar',
  })
  content: string;
}
