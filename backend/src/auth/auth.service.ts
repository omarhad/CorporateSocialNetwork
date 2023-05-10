import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';

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
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
