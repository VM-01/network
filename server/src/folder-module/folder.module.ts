/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {  FolderController } from './folder/folder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from '../entities/folders.entity';
import { FolderService } from './folder/folder.service';
import { UserModule } from 'src/users-module/user.module';
import { UserService } from 'src/users-module/user/user.service';
import { User } from 'src/entities/user.entity';
import { PhotoInFolder } from 'src/entities/photoinfolder.entity';
import { Requests } from 'src/entities/requests.entity';
import { Friends } from 'src/entities/friends.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Folder,User,PhotoInFolder,Requests,Friends]),
     UserModule
  ],
  controllers:[FolderController],
  providers:[FolderService,UserService]
})

export class FolderModule{}