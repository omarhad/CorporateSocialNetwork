import { Post as PrismaPost } from '@prisma/client';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InterfaceRequestWithUser } from '../interface/interface.RequestWithUser';
import { join } from 'path';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Récupérer tous les posts
  @Get()
  async getAllpost(): Promise<PrismaPost[]> {
    return this.postService.getAllPosts();
  }

  // Récupérer un post spécifique
  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PrismaPost | null> {
    return this.postService.getPostById(id);
  }

  // Créer un nouveau post
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async createPost(
    @Req() req: InterfaceRequestWithUser,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPostDto: CreatePostDto,
  ): Promise<PrismaPost> {
    const userId = req.user.id;

    console.log(files);

    if (files && files.length > 0) {
      createPostDto.images = files
        .filter((file) => file.path !== undefined)
        .map((file) => join('uploads', file.filename));
    }

    if (
      !createPostDto.content &&
      (!createPostDto.images || createPostDto.images.length === 0)
    ) {
      throw new BadRequestException(
        'Un post doit avoir au moins du contenu ou une image.',
      );
    }

    return this.postService.createPost(userId, createPostDto);
  }

  // Mettre à jour un post existant
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: InterfaceRequestWithUser,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files && files.length > 0) {
      updatePostDto.images = files
        .filter((file) => file.path !== undefined)
        .map((file) => join('uploads', file.filename));
    }

    return this.postService.updatePost(id, updatePostDto, req.user);
  }

  // Supprimer un post existant
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(
    @Param('id') id: string,
    @Req() req: InterfaceRequestWithUser,
  ) {
    const currentUser = req.user;
    if (currentUser.id == id || currentUser.isAdmin) {
      return this.postService.deletePost(id, req.user);
    } else {
      throw new UnauthorizedException(
        'You are not authorized to delete this post',
      );
    }
  }
}
