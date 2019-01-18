import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDetailDto } from './dto/user-detail.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  list(): Promise<UserDetailDto[]> {
    return this.usersService.list();
  }

  @Post()
  create(
    @Body(new ValidationPipe()) user: UserCreateDto,
  ): Promise<UserDetailDto> {
    return this.usersService.create(user);
  }

  @Get(':id')
  detail(@Param('id') id: number): Promise<UserDetailDto> {
    return this.usersService.detail(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) user: UserUpdateDto,
  ): Promise<UserDetailDto> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<UserDetailDto> {
    return this.usersService.remove(id);
  }
}
