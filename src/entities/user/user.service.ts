import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  //Register new user
  public async createUser(userData: any) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(userData.password, salt);
    const value = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    await this.userRepository.save(value);
  }

  //Get  user
  public async getUser(id: number):Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
