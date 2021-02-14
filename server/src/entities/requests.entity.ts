import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Requests{
    @PrimaryGeneratedColumn()
    id: number;
    @Column() 
    requestSender: number;     
    @Column() 
    requestGetter: number;
}