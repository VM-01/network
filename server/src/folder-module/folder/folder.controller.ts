import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import { FolderDto } from '../dto/folder.dto';
import { FolderService } from './folder.service';

@Controller('api')
export class FolderController {
  constructor(private service: FolderService) {}

  @Post('save-folder')
    findUserToSaveFolder(@Body() body:FolderDto): Promise<any>{
      return this.service.saveFolder(body)
    }

  @Post('load-folders')
    loadFolder(@Body() body): Promise<any>{
      return this.service.loadFolder(body)
    }
}


