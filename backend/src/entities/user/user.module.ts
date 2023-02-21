import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../../auth/constants";

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
