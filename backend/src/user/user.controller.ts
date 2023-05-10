import {
  Controller,
  Get,
  UseGuards,
  Put,
  Delete,
  Body,
  Query,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { InterfaceRequestWithUser } from '../interface/interface.RequestWithUser';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getUserProfile(@Query('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/profile')
  async updateProfile(
    @Query('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: InterfaceRequestWithUser,
  ) {
    const currentUser = req.user;
    if (currentUser.id == id || currentUser.isAdmin) {
      return this.userService.updateUser(id, updateUserDto);
    } else {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ce profil.",
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  async deleteProfile(
    @Query('id') id: string,
    @Req() req: InterfaceRequestWithUser,
  ): Promise<User> {
    const currentUser = req.user;
    if (currentUser.id == id || currentUser.isAdmin) {
      return this.userService.deleteUser(id);
    } else {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à supprimer ce profil.",
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }
}
