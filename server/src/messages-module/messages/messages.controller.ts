import { Body, Controller, Get, Post } from "@nestjs/common";
import { MessageService } from "./messages.service";

@Controller('messages')
export class MessageController{
    constructor(private service:MessageService){}

    @Post('get-friend-list')
    getFriends(@Body() body){
        return this.service.getFriends(body)
    }
   
}