import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import uniqid from 'uniqid'
import { Repository } from 'typeorm';
import { Folder } from 'src/entities/folders.entity';
import { User } from 'src/entities/user.entity';
import { Photo } from 'src/entities/photos.entity';
import { PhotoInFolder } from 'src/entities/photoinfolder.entity';
import * as fs from 'fs'
@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(Photo)
        private photoRepository: Repository<Photo>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(PhotoInFolder)
        private PhotoInFolderRepository: Repository<PhotoInFolder>,
        @InjectRepository(Folder)
        private folderRepository:Repository<Folder>
    ) {}

    async savePhoto(photo,body): Promise<Photo>{
        let user = await this.userRepository.findOne({token:body.token})
        return this.photoRepository.save({photo:photo.filename, name:body.name,user:{id:user.id}})
    }

    async loadPhotos(body): Promise<any>{
        let user = await this.userRepository.findOne(body)
        let photos = await this.photoRepository.findAndCount({user:{id:user.id}})
         
         return photos
        
        
    }

    async getAllPhotos(str){
        // return console.log(str);
        
        let user = await this.userRepository.findOne({token:str.token})
            
         
        let folders = await this.folderRepository.find({user:{id:user.id}})
        let photos = await this.photoRepository.find({user:{id:user.id}})
        let photosInFolders = await this.PhotoInFolderRepository.find({user:{id:user.id}})
        if(!folders){
            return {error:'There are no folders'}
        }else if(!photos){
            return {error:'There are not photos'}
        }else if(!photosInFolders){
            return {error:'There are not photos'}
        }else{
            return {photos, photosInFolders}
        }
    }

    async moveToFolder(body): Promise<Photo>{
        let user = await this.userRepository.findOne({token:body.token})
        let foundPhoto = await this.photoRepository.findOne({id:body.id})
        let movePhoto = await this.PhotoInFolderRepository.save({photo:body.photo, name: body.name, folder:{id:body.folderId},user:{id:user.id}}).then(r=>{
            return this.photoRepository.remove(foundPhoto)
        })
        
        return movePhoto
    }

    async loadPhotosFromFolder(body): Promise<Photo[]>{
        let user = await this.userRepository.findOne({token:body.token})
        let folderPhoto = await this.PhotoInFolderRepository.find({user:{id:user.id},folder:{id:body.id}})

        return folderPhoto
    }

    async uploadToFolder(photo,body){
        let user = await this.userRepository.findOne({token:body.token})
        let photoInFolder = await this.PhotoInFolderRepository.save({photo:photo.filename, name:body.name, folder:{id:body.folderId},user:{id:user.id}})
        return photoInFolder
    }

    async deleteFromFolder(body){ 
        // return console.log(body);
               
        let user = await this.userRepository.findOne({token:body.token})
        
        
        let photoInFolder = await this.PhotoInFolderRepository.findOne({id:body.photo.id,user:{id:user.id},folder:{id:body.folderId}})
        // return console.log(photoInFolder);
        return this.PhotoInFolderRepository.remove(photoInFolder).then(r=>{
             fs.unlink(`./images/${body.photo.photo}`,(error)=>{
                console.log(error)
            })
        })
        .then(r=>{
            return {success:'file was successfully deleted'}
        }) 
    }

    async deletePhoto(body){
        let user = await this.userRepository.findOne({token:body.token})
        let photo = await this.photoRepository.findOne({id:body.item.id,user:{id:user.id}})
        return this.photoRepository.remove(photo).then(r=>{
            fs.unlink(`./images/${body.item.photo}`,(error)=>{
                console.log(error)
            })
        }).then(r=>{
            return {success:'was deleted'}
        })
        
    }

    async deleteFolder(body){
        let user = await this.userRepository.findOne({token:body.token})
        let photosInFolder = await this.PhotoInFolderRepository.find({user:{id:user.id},folder:{id:body.id}})
        let folder = await this.folderRepository.findOne({user:{id:user.id},id:body.id})
         let arr=[]
          
         for(let i=0;i<photosInFolder.length; i++){
             arr.push(photosInFolder[i].photo)
             for(let k = 0;k<arr.length;k++){
                fs.unlink(`./images/${arr[k]}`,(error)=>{
                    console.log(error)
                })
             }
         }
         
          
          return this.PhotoInFolderRepository.remove(photosInFolder).then(r=>{
              return this.folderRepository.remove(folder)
          })
       
        
    }
  
}
