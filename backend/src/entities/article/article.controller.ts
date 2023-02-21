import {Controller, Get, Post, Put, Req, Res, UseGuards} from '@nestjs/common';
import { Response, Request } from 'express';
import {ArticleService} from "./article.service";
import {Role} from "../../auth/enums/role.enum";
import {Roles} from "../../auth/roles/roles.decorator";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {RolesGuard} from "../../auth/roles/roles.guard";
import {AuthGuard} from "@nestjs/passport";

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('/create')
  async createAnArticle(@Req() req: Request, @Res() res: Response) {
    await this.articleService.createAnArticle(req.body);
    return res.send({ status: 'ok' });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

}
