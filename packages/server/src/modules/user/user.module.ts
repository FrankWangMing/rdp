import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { HttpModule } from '@nestjs/axios'
import { PublicModule } from '../public/public.module'
import { UsersService } from './user.service'
import { UserInfoService } from './services/userInfo.service'

@Module({
  imports: [PublicModule, HttpModule],
  controllers: [UserController],
  providers: [UsersService, UserInfoService],
  exports: [
    UserInfoService,
    PublicModule,
    UsersService,
    HttpModule,
  ]
})
export class UserModule { }
