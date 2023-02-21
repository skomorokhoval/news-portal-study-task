import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {Article} from "./article.entity";
import {Role} from "../../auth/enums/role.enum";
import {Roles} from "../../auth/roles/roles.decorator";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
  ) {}

  @Roles(Role.Admin)
  public async createAnArticle(articleData: any) {
    const value = this.articleRepository.create({
      ...articleData,
    });
    await this.articleRepository.save(value);
  }
}
