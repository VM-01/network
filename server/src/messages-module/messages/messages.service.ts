import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Messages } from "src/entities/messages.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class MessageService{
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        @InjectRepository(Messages)
        private messageRepository:Repository<Messages>
    ){}
   async getFriends(body){
        let user = await this.userRepository.findOne({token:body.token})
        let messages = await this.messageRepository.find({
            where:[
                {messageGetter:user.id,messageSender:body.friendId},
                {messageGetter:body.friendId,messageSender:user.id}
            ]
        })
        return {messages,me:user.id}
    }

    
}