import { IsNotEmpty } from "class-validator";

export class FolderDto{
    @IsNotEmpty()
    token:string;
    @IsNotEmpty()
    name: string;
}