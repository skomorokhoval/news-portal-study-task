import { Controller, Delete, Get, Param, Patch, Post, Put, Req, Res, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('/')
  async getAllUsers(@Req() req: Request, @Res() res: Response) {

  }


  @Get('/:id')
  async getUserById(@Req() req: Request,@Param('id', ParseIntPipe)id: number, @Res() res: Response) {
    const user = await this.userService.getUser(id);
    return res.send({status: 'ok', data: user});
  }

//@UseInterceptors(FileInterceptor(''))
  @Post('/')
  async createUser(@Req() req: Request, @Res() res: Response) {
    await this.userService.createUser(req.body);
    return res.send({status: 'ok'});
  }

  @Put('/:id')
  async updateUser(@Req() req: Request, @Res() res: Response) {
    console.log(req.body)
    return res.send({status: 'ok'});
  }

  @Patch('/:id')
  async updateUserField(@Req() req: Request, @Res() res: Response) {
    console.log(req.headers)
    return res.send({status: 'ok'});
  }

  @Delete('/:id')
  async deleteUser(@Req() req: Request, @Res() res: Response) {
    console.log(req.headers)
    return res.send({status: 'ok'});
  }


}
