import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginData.email },
    });

    if (!user || !(await bcrypt.compare(loginData.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const payload = { userId: user.id };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }

  async signup(signupData: SignupDto) {
    const {
      email,
      password,
      firstName,
      lastName,
      birthdate,
      position,
      location,
      isAdmin,
    } = signupData;

    // Vérifier la force du mot de passe, la validité de l'e-mail, etc. avant de continuer

    try {
      const hashedPassword = await this.hashPassword(password);

      const userData = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        ...(birthdate ? { birthdate: new Date(birthdate) } : {}),
        ...(position ? { position } : {}),
        ...(location ? { location } : {}),
        ...{ isAdmin: !!isAdmin },
      };

      const newUser = await this.prisma.user.create({
        data: userData,
      });

      const payload = { userId: newUser.id };
      const token = this.jwtService.sign(payload);

      return { user: newUser, token };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${email} already exists.`);
      } else {
        throw new InternalServerErrorException('Something went wrong.');
      }
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
