// CreateCommentDto.ts
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  postId: string;
}
