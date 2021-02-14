import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Folder } from "./folders.entity";
import { Photo } from "./photos.entity";
import { User } from "./user.entity";

@Entity()
export class PhotoInFolder{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    photo: string;
    @Column()
    name:string;
    @ManyToOne(() => Folder, folder => folder.id)
    @JoinColumn() 
    folder: Folder;
    @ManyToOne(() => User, user => user.id)
    @JoinColumn() 
    user: User;
}