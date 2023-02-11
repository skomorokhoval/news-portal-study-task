import { Module } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { TypeormModule } from './db/typeorm.module';


@Module({
  imports: [UserModule, TypeormModule]
})
export class AppModule {}
