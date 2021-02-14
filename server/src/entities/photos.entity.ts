import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Folder } from "./folders.entity";
import { User } from "./user.entity";

@Entity()
export class Photo{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    photo: string;
    @Column()
    name:string;
    @ManyToOne(() => User, user => user.id)
    @JoinColumn() 
    user: User;
}