import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
const uniqid = require('uniqid')
import { createQueryBuilder, getRepository, Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { Requests } from '../../entities/requests.entity';
import { from } from 'rxjs';
import { Friends } from 'src/entities/friends.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepasitory: Repository<User>,
        private readonly mailService:MailerService,
        @InjectRepository(Requests)
        private requestRepository:Repository<Requests>,
        @InjectRepository(Friends)
        private friendsRepository:Repository<Friends>
    ) {}


   async checkLogin(body): Promise<any>{
        let found = await this.userRepasitory.findOne(body)
        if(found){
            return {error:'Choose another login'}
        }else{
            return {success:'Login is free'}
        }        
    }

    async verifyUser(body): Promise<any>{
        let user = await this.userRepasitory.findOne({login:body.login})
        if(!user){
            return {error: 'User not found'}
        }else{
            if(user.verifyCode !== body.code){
                return {error: 'Verification code is not right'}
            }else{
                user.verified = 1
                return this.userRepasitory.save(user).then(r=>{
                    return {success:'Your account heas been verified successfully'}
                })
            }
        } 
    }
    
    async saveUser(body): Promise<any>{
        let registerUser = await this.userRepasitory.find(body)
        if(registerUser.length>0){
            return {error:'You have already registered'}
        }else{
            const fullname = `${body.name} ${body.surname}`
            body.fullname = fullname
            body.verified = 0
            body.verifyCode = uniqid()
            return this.userRepasitory.save(body).then(r=>{
                return {success:'you have been registered'}
            }) 
        }
    }

    async login(body): Promise<any>{
        let user = await this.userRepasitory.findOne({login:body.login})
        if(user){
           if(body.password!==user.password){
               return {error:"password is incorrect"}
           }else if(user.verified===0){
            return this.mailService.sendMail({
                to:body.login,
                from:'vahanmur007@gmail.com',
                subject:'registration verify',
                text:'welcome',
                html:`<b> Welcome to IT - CV<br/>
                        <br/>You Should verify your email in 3 days or your account will be deleted<br/>
                        <b>your verification code is: ${user.verifyCode}</b>
                        </b><br/>
                        <a href='http://localhost:3000/verify'>click here to confirm</a>`
            }).then(r=>{
               return {error:'Check your mail'}
            }).catch(r=>console.log(r))
                 
           }else if(body.password===user.password && user.verified===1){
               user.token = uniqid()
            await this.userRepasitory.save(user)    
              return {token: user.token}
           }
        }else{
           return {error:'account not found'}
        }
    }

    async findByToken(token): Promise<any>{
        let user = await this.userRepasitory.findOne({token: token.token})
        if(!user){
            return {error:'Account not found'}
        }else{
            return user
        }
        
    }
    
    async logOut(token): Promise<any>{
        let user = await this.userRepasitory.findOne(token)
        user.token=''
        return this.userRepasitory.save(user)
    }

    async search(body):Promise<Object>{
        let user = await this.userRepasitory.findOne({token:body.token})
        let users = await this.userRepasitory.find()
        let found = []
        users.map(item=>{
            if(item.fullname.toLocaleLowerCase().includes(body.text.toLocaleLowerCase()) && item.id!==user.id){
                found.push({id:item.id, name:item.fullname, photo:item.photo})
            }
        })
        if(user){
            if(body.text==''){
                return []
            }else{
                return found
            }
            
        }else{
           return {error:'User not found'}
        }
    }

    async getUser(body):Promise<Object>{
       let user1 = await this.userRepasitory.findOne({token:body.token})
       let user2 = await this.userRepasitory.findOne({id:body.id})
       if(user1){
           return {id:user2.id, name: user2.fullname, photo: user2.photo, theme: user2.theme}
       }else{
           return {error: 'Account not found'}
       }
    }

    async sendFriendRequest(body):Promise<Object>{
        let user1 = await this.userRepasitory.findOne({token:body.token})
        let user2 = await this.userRepasitory.findOne(body.friendId)
        let req = await this.requestRepository.findOne({requestSender:user1.id,requestGetter:user2.id})
        if(user1 && user2 && !req){
           return this.requestRepository.save({requestSender:user1.id,requestGetter:user2.id}).then(r=>{
               return {success:'Frend request was sent'}
           })
        }else if(req){
            return {error:'You have already sent the friend request'}
        }
    }

    async loadRequests(body):Promise<Object>{
        let user = await this.userRepasitory.findOne({token:body.token})
        let requests = await this.requestRepository.find({requestGetter:user.id}).then(r=>{
            let a=[]
            r.map(item=>{
                a.push(item.requestSender)
            })
            return a
        })
        let users = await this.userRepasitory.findByIds(requests)
        let usersRes = []
        users.map(item=>{
            usersRes.push({id:item.id,name:item.fullname,photo:item.photo })
        })

        if(user){
            if(requests){
                return usersRes
            }else{
                return {error:'There are no requests'}
            }
        }else{
            return {error:'accounte not found'}
        }
    }

    async acceptFriend(body){
        let user = await this.userRepasitory.findOne({token:body.token})
        let findReq = await this.requestRepository.findOne({requestSender:body.friendId,requestGetter:user.id})
        let acceptReq = await this.friendsRepository.save({user1:findReq.requestGetter,user2:findReq.requestSender}).then(r=>{
           return this.requestRepository.remove(findReq)
        })
        return acceptReq
    }

    async declineFriend(body){
        let user = await this.userRepasitory.findOne({token:body.token})
        let req = await this.requestRepository.find({requestGetter:user.id, requestSender:body.friendId})
        return this.requestRepository.remove(req)
    }

    async loadFriends(body){
        let user = await this.userRepasitory.findOne({token:body.token})
         
        let friends = await this.friendsRepository.find({user1:user.id}).then(r=>{
            let a = []
            r.map(item=>{
                a.push(item.user2)
            })
            return a
        })
        
        let users = await this.userRepasitory.findByIds(friends)
        let usersRes = []
        users.map(item=>{
            usersRes.push({id:item.id,name:item.fullname,photo:item.photo })
        })
        if(user){
            if(friends){
                return usersRes
            }else{
                return {error:'There are no requests'}
            }
        }else{
            return {error:'accounte not found'}
        }
        
    }

    async deleteFriend(body){
        let user = await this.userRepasitory.findOne({token:body.token})
        let req = await this.friendsRepository.find({user1:user.id, user2:body.friendId})
        return this.friendsRepository.remove(req)
    }
}
