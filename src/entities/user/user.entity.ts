import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'username',
    type: 'varchar',
  })
  username: string;

  @Column({
    name: 'email',
    type: 'varchar',
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
  })
  password: string;

  @Column({
    name: 'name_first',
    type: 'varchar',
  })
  nameFirst: string;

  @Column({
    name: 'name_last',
    type: 'varchar',
  })
  nameLast: string;

  @Column({
    name: 'user_role',
    type: 'varchar',
  })
  role: string;

  @Column({
    name: 'user_permission',
    type: 'varchar',
  })
  userPermission: string;

  isCookiesAccepted: boolean;
}
