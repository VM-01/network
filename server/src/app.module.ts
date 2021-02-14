import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users-module/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderModule } from './folder-module/folder.module';
import { PhotoModule } from './photo-module/photo.module';
import { MulterModule } from '@nestjs/platform-express';
import { MessagesModule } from './messages-module/messages.module';


@Module({
  imports: [
    UserModule, 
    FolderModule, 
    PhotoModule, 
    MessagesModule,
    TypeOrmModule.forRoot(),
    MulterModule.register({
      dest:'./images'
    }),
   
  ],
  controllers: [AppController],
  providers: [AppService],
  
})

export class AppModule {}
