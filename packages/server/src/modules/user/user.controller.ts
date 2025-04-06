import { HttpService } from '@nestjs/axios'
import {
  Body,
  Controller,
  Post,
  Headers,
  Get,
  NotFoundException,
  Query,
  BadRequestException,
  Param
} from '@nestjs/common'
import { UsersService } from './user.service'
import { UserEntity } from 'src/common/decorators/user.decorator'
import { assign, concat, get, isNull, reduce } from 'lodash'
import { firstValueFrom } from 'rxjs'
import { AuthService } from '../public/auth/auth.service'
import { UserInfoService } from './services/userInfo.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly user: UsersService,
    private readonly userInfo: UserInfoService,
    private readonly auth: AuthService,
    private readonly httpService: HttpService,
  ) { }

}
