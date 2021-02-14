import { Messages } from "src/entities/messages.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
 import { Socket, Server } from "socket.io";
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
@WebSocketGateway()
export class MessageGateWay implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit{
    @WebSocketServer() server:Server;
     constructor(
         @InjectRepository(User)
         private userRepository: Repository<User>,
         @InjectRepository(Messages)
         private messageRepository:Repository<Messages>
     ){}

    @SubscribeMessage('startChat')
    async handleEvent(@MessageBody() body: any): Promise<any> {
            let user = await this.userRepository.findOne({token:body.token})
            let messages = await this.messageRepository.find({
                where:[
                    {messageGetter:user.id,messageSender:body.friendId},
                    {messageGetter:body.friendId,messageSender:user.id}
                ]
            })
            // console.log(body);
            
            this.server.emit( 'getMessages',{messages,me:user.id} )
      }

    @SubscribeMessage('compose')
    async messageToServer(@MessageBody() body: any): Promise<any> {
        let user = await this.userRepository.findOne({token:body.token})
        if(user){
            // this.server.emit( 'getMessages',{messages,me:user.id} )
           return this.messageRepository.save({messageSender:user.id,messageGetter:body.friendId,message:body.text}).then(r=>{
               return this.server.sockets.emit('compose',r)
            })
            
        }
       
    }

    afterInit(server: Server){
        console.log('Init')
    }

    handleConnection(client: Socket){
         
    }

    handleDisconnect(client: Socket){
         
    }

}