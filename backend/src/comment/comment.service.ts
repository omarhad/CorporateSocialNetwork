import { Injectable } from '@nestjs/common';
import { Comment, User } from '@prisma/client';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getAllComments(postId: string): Promise<Comment[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        likes: true,
      },
    });

    return comments;
  }

  async getCommentById(id: string): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where: { id },
      include: {
        likes: true,
      },
    });
  }

  async createComment(
    userId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const { postId, content } = createCommentDto;

    return this.prisma.comment.create({
      data: {
        content,
        post: {
          connect: {
            id: postId,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async updateComment(
    id: string,
    updateCommentDto: UpdateCommentDto,
    user: User,
  ): Promise<Comment> {
    const { content } = updateCommentDto;

    const existingComment = await this.prisma.comment.findUnique({
      where: { id },
      select: {
        authorId: true,
      },
    });

    if (!existingComment) {
      throw new Error(`Commentaire d'ID ${id} n'existe pas.`);
    }

    if (existingComment.authorId !== user.id) {
      throw new Error(`Vous n'êtes pas autorisé à modifier ce commentaire.`);
    }

    return this.prisma.comment.update({
      where: { id },
      data: {
        content,
      },
    });
  }

  async deleteComment(id: string, user: User): Promise<Comment> {
    const existingComment = await this.prisma.comment.findUnique({
      where: { id },
      select: {
        authorId: true,
      },
    });

    if (!existingComment) {
      throw new Error(`Commentaire d'ID ${id} n'existe pas.`);
    }

    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
