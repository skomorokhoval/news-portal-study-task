import { Module } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { TypeormModule } from './db/typeorm.module';
import { AuthModule } from './auth/auth.module';
import {ArticleModule} from "./entities/article/article.module";

@Module({
  imports: [UserModule, TypeormModule, AuthModule, ArticleModule],
})
export class AppModule {}
