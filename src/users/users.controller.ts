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
  ClassSerializerInterceptor,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  Res,
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
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { MailService } from './mail.service';
import { Response } from 'express';

@Controller('/api/users')
@ApiUseTags('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  @Get()
  @ApiOperation({ title: 'List all registered users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [User],
  })
  list(): Promise<User[]> {
    return this.usersService.list();
  }

  @Post()
  @ApiOperation({ title: 'Registers a new user' })
  @ApiCreatedResponse({ description: 'Created user', type: User })
  @ApiBadRequestResponse({ description: 'Invalid body parameters' })
  @UseInterceptors(FileInterceptor('avatar'))
  create(@Body(new ValidationPipe()) user: User, @UploadedFile() avatar?): Promise<User> {
    this.mailService.sendMail(user.email);
    if (avatar) {
      user.avatar = avatar.buffer;
      user.mimetype = avatar.mimetype;
    }
    return this.usersService.create(user);
  }

  @Get('me')
  @UseGuards(AuthGuard())
  @ApiOperation({ title: 'Shows current logged user' })
  @ApiOkResponse({ description: 'Current logged user', type: User })
  @ApiBearerAuth()
  me(@Req() req): Promise<User> {
    return req.user;
  }

  @Get(':id')
  @ApiOperation({ title: 'Gets the fields from a user' })
  @ApiOkResponse({ description: 'User with the given ID', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  detail(@Param('id') id: number): Promise<User> {
    return this.usersService.detail(id);
  }

  @Get(':id/avatar')
  async avatar(@Param('id') id: number, @Res() res: Response) {
    const user = await this.usersService.detail(id);
    if (user.avatar) {
      console.log(JSON.stringify(user.avatar));
      res.setHeader('Content-Type', user.mimetype);
      res.end(user.avatar, 'utf8');
    }
  }

  @Put(':id')
  @ApiOperation({ title: 'Updates the fields from a user' })
  @ApiOkResponse({ description: 'Updated user', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) user: User,
    @UploadedFile() avatar?
  ): Promise<User> {
    if (avatar) {
      user.avatar = avatar.buffer;
      user.mimetype = avatar.mimetype;
    }
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Removes a user' })
  @ApiOkResponse({ description: 'Removed user', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  delete(@Param('id') id: number): Promise<User> {
    return this.usersService.delete(id);
  }
}
