import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    const result = await this.authService.login(loginData);
    return result;
  }

  @Post('signup')
  async signup(@Body() signupData: SignupDto) {
    const result = await this.authService.signup(signupData);
    return result;
  }
}
