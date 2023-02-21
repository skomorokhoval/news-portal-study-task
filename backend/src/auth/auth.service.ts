import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {jwtConstants} from "./constants";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({where: {username}, select: ['username', 'password', 'role', 'id']});
      if (user && (await compare(pass, user.password))) {
        return user;
      }
      return null;
    }
    catch(e){
      throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, roles: user.role };
    const cookie = this.getCookieWithJwtToken(user.id);
    return {
      success: true,
      access_token: this.jwtService.sign(payload),
      cookie
    };
  }

  public getCookieWithJwtToken(userId: number) {
    const payload= { userId };
    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: `${jwtConstants.jwtAccessTokenExpirationTime}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${jwtConstants.jwtAccessTokenExpirationTime}`;
  }

  // public getCookieWithJwtRefreshToken(userId: number) {
  //   const payload = { userId };
  //   const token = this.jwtService.sign(payload, {
  //     secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
  //     expiresIn: `${this.configService.get(
  //         'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
  //     )}s`,
  //   });
  //   const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
  //       'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
  //   )}`;
  //   return {
  //     cookie,
  //     token,
  //   };
  // }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
