import { Controller, Post, Put, Req, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import {JwtService} from "@nestjs/jwt";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('/register')
  async createUser(@Req() req: Request, @Res() res: Response) {
    const { status, role, accessToken } = await this.userService.createUser(req.body);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    return res.send({ status, role, accessToken });
  }
}
