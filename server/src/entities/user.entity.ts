import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fullname: string;
  @Column()
  name: string;
  @Column()
  surname: string;
  @Column()
  login: string;
  @Column()
  password: string;
  @Column()
  token: string;
  @Column()
  photo: string;
  @Column()
  theme: string;
  @Column()
  verified: number;
  @Column()
  verifyCode: string;
}