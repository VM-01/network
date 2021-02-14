import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
const uniqid = require('uniqid')
import { Repository } from 'typeorm';
import { Folder } from 'src/entities/folders.entity';
import { User } from 'src/entities/user.entity';
import { PhotoInFolder } from 'src/entities/photoinfolder.entity';

@Injectable()
export class FolderService {
    constructor(
        @InjectRepository(Folder)
        private folderRepository: Repository<Folder>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(PhotoInFolder)
        private photoFolderRepository: Repository<PhotoInFolder>
    ) {}

   async saveFolder(body){
       let user = await this.userRepository.findOne({token:body.token})
       let folder = await this.folderRepository.save({name:body.name,user:{id:user.id}})
        return !user ? {error:'Account not found'} : folder
       
    }

    async loadFolder(body) {
        let user = await this.userRepository.findOne(body)
        let folders = await this.folderRepository.findAndCount({user:{id:user.id}})
       
        
        return !user?{error:'Account not found'}:folders        
    }
}
