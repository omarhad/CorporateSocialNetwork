import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UploadMiddleware } from '../../multer.config';

@Module({
  imports: [UploadMiddleware],
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {}
