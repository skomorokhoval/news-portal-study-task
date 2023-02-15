import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import {
  ADMIN,
  ADMIN_PREFIX,
  READER,
  READER_PREFIX,
} from '../../utils/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  //Register new user
  public async createUser(userData: any) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(userData.password, salt);
    const role = this.setUserRole(userData.login);
    const value = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      role,
    });
    await this.userRepository.save(value);
  }

  setUserRole(login: string): string {
    if (login.includes(ADMIN_PREFIX)) {
      return ADMIN;
    } else {
      if (login.includes(READER_PREFIX)) {
        return READER;
      }
    }
  }
}
