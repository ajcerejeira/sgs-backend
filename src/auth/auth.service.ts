import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(payload: JwtPayload): Promise<string> {
    const match = await await this.usersService.validate(
      payload.email,
      payload.password,
    );
    if (!match) {
      throw new UnauthorizedException();
    }
    return this.jwtService.sign(payload);
  }

  async validate(payload: JwtPayload): Promise<boolean> {
    return await this.usersService.validate(payload.email, payload.password);
  }
}
