import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('api/auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: JwtPayload) {
    return this.authService.login(payload);
  }
}
