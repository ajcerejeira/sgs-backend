import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload';

@Controller('api/auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ title: 'Creates a JWT token for an authorized user' })
  @ApiCreatedResponse({ description: 'JWT token', type: String })
  async login(@Body(new ValidationPipe()) payload: JwtPayload) {
    return this.authService.login(payload);
  }
}
