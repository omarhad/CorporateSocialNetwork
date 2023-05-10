import { Post as PrismaPost, Prisma, User as UserModel } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPosts(): Promise<PrismaPost[]> {
    return this.prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        likes: true,
        author: true,
        images: true,
        comments: {
          include: { author: true, likes: true },
        },
      },
    });
  }

  async getPostById(id: string): Promise<PrismaPost | null> {
    return this.prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        likes: true,
        author: true,
        images: true,
        comments: {
          include: { author: true, likes: true },
        },
      },
    });
  }

  async createPost(
    authorId: string,
    createPostDto: CreatePostDto,
  ): Promise<PrismaPost> {
    const { content, images } = createPostDto;

    if (!content) {
      throw new BadRequestException('Content must be provided');
    }
    const postData: Prisma.PostCreateInput = {
      content,
      author: {
        connect: {
          id: authorId,
        },
      },
    };

    if (images) {
      postData['images'] = {
        create: images.map((url) => ({ url })),
      };
    }

    return this.prisma.post.create({ data: postData });
  }

  async updatePost(
    id: string,
    updatePostDto: UpdatePostDto,
    user: UserModel,
  ): Promise<PrismaPost> {
    const { content, images } = updatePostDto;
    const existingPost = await this.prisma.post.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!existingPost) {
      throw new NotFoundException('Post not found');
    }

    if (existingPost.authorId !== user.id) {
      throw new UnauthorizedException(
        'You are not authorized to update this post',
      );
    }

    const postData: Prisma.PostUpdateInput = {
      ...(content && { content }),
    };

    if (images) {
      postData['images'] = {
        create: images.map((url) => ({ url })),
        connect: existingPost.images.map((image) => ({ id: image.id })),
      };
    }

    return this.prisma.post.update({ where: { id }, data: postData });
  }

  async deletePost(id: string, user: UserModel): Promise<PrismaPost> {
    const existingPost = await this.prisma.post.findUnique({ where: { id } });

    if (!existingPost) {
      throw new NotFoundException('Post not found');
    }

    if (existingPost.authorId !== user.id && user.isAdmin == false) {
      throw new UnauthorizedException(
        'You are not authorized to delete this post',
      );
    }

    // Delete related images first
    await this.prisma.image.deleteMany({ where: { postId: id } });

    // Then delete the post
    return this.prisma.post.delete({ where: { id } });
  }
}
