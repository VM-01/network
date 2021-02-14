import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Folder{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    photo: string
    @ManyToOne(() => User, user => user.id)
    @JoinColumn() 
    user: User;
}