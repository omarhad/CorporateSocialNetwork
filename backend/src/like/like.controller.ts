import { Controller, Post, Param, Req, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InterfaceRequestWithUser } from '../interface/interface.RequestWithUser';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  // Ajouter ou retirer un like d'un post ou d'un commentaire
  @UseGuards(JwtAuthGuard)
  @Post('/:type/:id')
  async toggleLike(
    @Param('type') type: 'post' | 'comment',
    @Param('id') id: string,
    @Req() req: InterfaceRequestWithUser,
  ) {
    const currentUser = req.user;

    if (type === 'post') {
      return this.likeService.toggleLikeOnPost(currentUser.id, id);
    } else if (type === 'comment') {
      return this.likeService.toggleLikeOnComment(currentUser.id, id);
    }
  }
}
