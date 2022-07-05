import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { User } from './entitiy/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/user-create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.repository.findOne(options);
    return user.toDto();
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.repository.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await user.validatePassword(password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user.toDto();
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({ where: { username } });
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { firstname, lastname, username, password, email } = userDto;

    const userInDb = await this.repository.findOne({ where: { username } });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: User = await this.repository.create({
      firstname,
      lastname,
      username,
      password,
      email,
    });

    await this.repository.save(user);

    return user.toDto();
  }

  private _sanitizeUser(user: User) {
    delete user.password;
    return user;
  }
}