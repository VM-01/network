/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { Requests } from 'src/entities/requests.entity';
import { Friends } from 'src/entities/friends.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Requests,Friends]),
    MailerModule.forRootAsync({
      useFactory:()=>({
        transport:'smtps://vahanmur007@gmail.com:vasterlord_9600@smtp.gmail.com',
        defaults:{
          from:'"nest-modules" <modules@nestjs.com>',
        }
      }),
    
    })
  ],
  controllers:[UserController],
  providers:[UserService]
})

export class UserModule{}