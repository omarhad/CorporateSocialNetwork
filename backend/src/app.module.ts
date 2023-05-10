import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { UploadMiddleware } from '../multer.config';

@Module({
  imports: [AuthModule, UserModule, PostModule, CommentModule, LikeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
