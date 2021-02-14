import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from '../entities/folders.entity';
import { UserModule } from 'src/users-module/user.module';
import { UserService } from 'src/users-module/user/user.service';
import { User } from 'src/entities/user.entity';
import { PhotoController } from './photo/photo.controller';
import { FolderService } from 'src/folder-module/folder/folder.service';
import { FolderModule } from 'src/folder-module/folder.module';
import { Photo } from 'src/entities/photos.entity';
import { PhotoService } from './photo/photo.service';
import { MulterModule } from '@nestjs/platform-express';
import { PhotoInFolder } from 'src/entities/photoinfolder.entity';
import { Requests } from 'src/entities/requests.entity';
import { Friends } from 'src/entities/friends.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Folder,User,Photo,PhotoInFolder,Requests,Friends]),
     UserModule, FolderModule
  ],
  controllers:[PhotoController],
  providers:[PhotoService,FolderService,UserService]
}) 

export class PhotoModule{}