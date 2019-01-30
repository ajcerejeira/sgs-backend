import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async list(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(user: User): Promise<User> {
    const newUser = await this.userRepository.save({
      ...user,
      password: await hash(user.password, 10),
    });
    return newUser;
  }

  async detail(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('The requested user could not be found');
    }
    return user;
  }

  async update(id: number, newUser: User): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('The requested user could not be found');
    }
    const updatedUser = await this.userRepository.save({
      id,
      ...user,
      ...newUser,
      password: newUser.password
        ? await hash(newUser.password, 10)
        : user.password,
    });
    return updatedUser;
  }

  async delete(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('The requested user could not be found');
    }
    await this.userRepository.delete(id);
    return user;
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException('The requested user could not be found');
    }
    return (await compare(password, user.password)) ? user : null;
  }
}
