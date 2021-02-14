import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('api')
export class UserController {
  constructor(private service: UserService) {}

  @Post('check-login')
    findLogin(@Body() body:LoginDto): Promise<string>{
      return this.service.checkLogin(body)
    }

  @Post('register')
    register(@Body() body: UserDto): Promise<any>{
      return this.service.saveUser(body)

  }

  @Post('login')
   check(@Body() body: LoginDto): Promise<any>{
    return this.service.login(body)
  }

  @Post('loadProfileData')
    findUserData(@Body() token): Promise<any>{
      return this.service.findByToken(token)
    }

  @Post('log-out')
    logOut(@Body() token) {
      return this.service.logOut(token)
  }

  @Post('search')
    search(@Body() body){
      return this.service.search(body)
    }

  @Post('verify')
    verify(@Body() body){
     return this.service.verifyUser(body)
    }

  @Post('get-user')
    getUser(@Body() body){
      return this.service.getUser(body)
    }

  @Post('send-friend-request')
    sendReq(@Body() body){
     return this.service.sendFriendRequest(body)
    }

  @Post('load-requests')
    loadRequests(@Body() body){
      return this.service.loadRequests(body)
    }
  @Post('accept-friend')
    accept(@Body() body){
      return this.service.acceptFriend(body)
    }

    @Post('decline-friend')
    decline(@Body() body){
      return this.service.declineFriend(body)
    }

  @Post('load-friends')
  loadFriends(@Body() body){
    return this.service.loadFriends(body)
  }
  @Post('remove-friend')
  removeFriend(@Body() body){
   return this.service.deleteFriend(body)
  }
}
