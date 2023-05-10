import { Comment as PrismaComment } from '@prisma/client';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InterfaceRequestWithUser } from '../interface/interface.RequestWithUser';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // Récupérer tous les commentaires
  @Get(':postId')
  async getAllComments(
    @Param('postId') postId: string,
  ): Promise<PrismaComment[]> {
    return this.commentService.getAllComments(postId);
  }

  // Récupérer un commentaire spécifique
  @Get(':id')
  async getCommentById(@Param('id') id: string): Promise<PrismaComment | null> {
    return this.commentService.getCommentById(id);
  }

  // Créer un nouveau commentaire
  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Req() req: InterfaceRequestWithUser,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<PrismaComment> {
    const userId = req.user.id;

    if (!createCommentDto.content) {
      throw new BadRequestException('Le commentaire doit avoir un contenu.');
    }

    return this.commentService.createComment(userId, createCommentDto);
  }

  // Mettre à jour un commentaire existant
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: InterfaceRequestWithUser,
  ) {
    return this.commentService.updateComment(id, updateCommentDto, req.user);
  }

  // Supprimer un commentaire existant
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteComment(
    @Param('id') id: string,
    @Req() req: InterfaceRequestWithUser,
  ) {
    const currentUser = req.user;
    // Get the comment using the commentService
    const currentComment = await this.commentService.getCommentById(id);

    if (!currentComment) {
      throw new NotFoundException('Comment not found');
    }

    console.log(currentUser.id === currentComment.authorId);
    console.log(currentUser.isAdmin);

    if (currentUser.id === currentComment.authorId || currentUser.isAdmin) {
      return this.commentService.deleteComment(id, currentUser);
    } else {
      throw new UnauthorizedException(
        'You are not authorized to delete this post',
      );
    }
  }
}
