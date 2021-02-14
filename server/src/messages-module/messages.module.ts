import { MessageGateWay } from './messages/messages.gateway';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from 'src/entities/messages.entity';
import { User } from 'src/entities/user.entity';
import { MessageController } from './messages/messages.controller';
import { MessageService } from './messages/messages.service';
 
@Module({
    imports:[TypeOrmModule.forFeature([Messages,User])],
    controllers:[MessageController],
    providers:[MessageService, MessageGateWay]
})
export class MessagesModule{}