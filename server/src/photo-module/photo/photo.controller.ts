import {Body, Controller, Delete, HttpException, HttpStatus, Post, UploadedFile, UploadedFiles, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { PhotoService } from './photo.service';
import { diskStorage } from 'multer';

 @Controller('api')
export class PhotoController {
  constructor(private service: PhotoService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('photo',
    {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }))
  async uploadFile(@UploadedFile() photo, @Body() body) {
    const response = {
      originalname: photo.originalname,
      filename: photo.filename,
    };
    return this.service.savePhoto(response,body)
  }
  @Post('load-photos')
  loadPhotos(@Body() body){
    return this.service.loadPhotos(body)
  }

  @Post('move-to-folder')
  moveTo(@Body() body){
    return this.service.moveToFolder(body)
  }

  @Post('get-photo-from-folder')
  getPhoto(@Body() body){
    return this.service.loadPhotosFromFolder(body)
  }

  @Post('upload-image-to-folder')
  @UseInterceptors(FileInterceptor('photo',{
  storage:diskStorage({
    destination:'./images',
    filename:editFileName
  }),
  fileFilter: imageFileFilter,
}))
async uploadPhotoToFolder(@UploadedFile() photo, @Body() body){
  const response = {
    originalname: photo.originalname,
    filename: photo.filename,
  };
  return this.service.uploadToFolder(response, body)
}

@Post('delete-photo-from-folder')
deleteFromFolder(@Body() body){  
   return this.service.deleteFromFolder(body)
  }

@Post('delete-photo')
  deletePhoto(@Body() body){
    return this.service.deletePhoto(body)
  }

@Post('delete-folder')
deleteFolder(@Body() body){
  return this.service.deleteFolder(body)
}

@Post('get-all-photos')
getAllPhotos(@Body() token){
  return this.service.getAllPhotos(token)
}
}

