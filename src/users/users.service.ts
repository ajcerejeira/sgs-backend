import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDetailDto } from './dto/user-detail.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async list(): Promise<UserDetailDto[]> {
    const users = await this.userRepository.find();
    return users.map(user => new UserDetailDto(user));
  }

  async create(user: UserCreateDto): Promise<UserDetailDto> {
    const newUser = await this.userRepository.save({
      ...user,
      password: await hash(user.password, 10),
    });
    return new UserDetailDto(newUser);
  }

  async detail(id: number): Promise<UserDetailDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('The requested user could not be found');
    }
    return new UserDetailDto(user);
  }

  async update(id: number, newUser: UserUpdateDto): Promise<UserDetailDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('The requested user could not be found');
    }
    const updatedUser = await this.userRepository.save({
      id,
      ...user,
      ...newUser,
      password: user.password ? await hash(user.password, 10) : user.password,
    });
    return new UserDetailDto(updatedUser);
  }

  async delete(id: number): Promise<UserDetailDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('The requested user could not be found');
    }
    await this.userRepository.delete(id);
    return new UserDetailDto(user);
  }

  async validate(
    email: string,
    password: string,
  ): Promise<UserDetailDto | null> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException('The requested user could not be found');
    }
    return (await compare(password, user.password))
      ? new UserDetailDto(user)
      : null;
  }
}
