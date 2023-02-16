import { Controller, Post, Put, Req, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@UseInterceptors(FileInterceptor(''))
  @Post('/register')
  async createUser(@Req() req: Request, @Res() res: Response) {
    await this.userService.createUser(req.body);
    return res.send({ status: 'ok' });
  }

  @Put('/:id')
  async updateUser(@Req() req: Request, @Res() res: Response) {
    console.log(req.body);
    return res.send({ status: 'ok' });
  }
}
