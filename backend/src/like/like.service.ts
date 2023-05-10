import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async toggleLikeOnPost(userId: string, postId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { likedPosts: { select: { id: true } } },
    });

    if (!user) {
      throw new Error(`User with id ${userId} does not exist.`);
    }

    const alreadyLiked = user.likedPosts.some((p) => p.id === postId);

    if (alreadyLiked) {
      await this.prisma.post.update({
        where: { id: postId },
        data: { likes: { disconnect: { id: userId } } },
      });
    } else {
      await this.prisma.post.update({
        where: { id: postId },
        data: { likes: { connect: { id: userId } } },
      });
    }
  }

  async toggleLikeOnComment(userId: string, commentId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { likedComments: { select: { id: true } } },
    });

    if (!user) {
      throw new Error(`User with id ${userId} does not exist.`);
    }

    const alreadyLiked = user.likedComments.some((c) => c.id === commentId);

    if (alreadyLiked) {
      await this.prisma.comment.update({
        where: { id: commentId },
        data: { likes: { disconnect: { id: userId } } },
      });
    } else {
      await this.prisma.comment.update({
        where: { id: commentId },
        data: { likes: { connect: { id: userId } } },
      });
    }
  }
}
