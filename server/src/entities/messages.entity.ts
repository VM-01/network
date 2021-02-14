import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Messages{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    messageSender:number;
    @Column()
    messageGetter:number;
    @Column()
    message:string;
}