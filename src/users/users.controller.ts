import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDetailDto } from './dto/user-detail.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Controller('/api/users')
@ApiUseTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({ title: 'List all registered users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [UserDetailDto],
  })
  list(@Req() req: any): Promise<UserDetailDto[]> {
    return this.usersService.list();
  }

  @Post()
  @ApiOperation({ title: 'Registers a new user' })
  @ApiCreatedResponse({ description: 'Created user', type: UserCreateDto })
  @ApiBadRequestResponse({ description: 'Invalid body parameters' })
  create(
    @Body(new ValidationPipe()) user: UserCreateDto,
  ): Promise<UserDetailDto> {
    return this.usersService.create(user);
  }

  @Get(':id')
  @ApiOperation({ title: 'Gets the fields from a user' })
  @ApiOkResponse({ description: 'User with the given ID', type: UserDetailDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  detail(@Param('id') id: number): Promise<UserDetailDto> {
    return this.usersService.detail(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Updates the fields from a user' })
  @ApiOkResponse({ description: 'Updated user', type: UserDetailDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) user: UserUpdateDto,
  ): Promise<UserDetailDto> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Removes a user' })
  @ApiOkResponse({ description: 'Removed user', type: UserDetailDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  delete(@Param('id') id: number): Promise<UserDetailDto> {
    return this.usersService.delete(id);
  }
}
