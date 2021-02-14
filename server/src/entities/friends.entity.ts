import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Friends{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user1: number;
    @Column()
    user2: number;
}