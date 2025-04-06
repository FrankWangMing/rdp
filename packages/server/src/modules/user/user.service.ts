import { Injectable } from '@nestjs/common'
import { AuthService } from 'src/modules/public/auth/auth.service'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { ConfigService } from '@nestjs/config'

import { UserInfoService } from './services/userInfo.service'
import { isEqual, map, range, sampleSize } from 'lodash'
import { log } from 'console'

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    readonly configService: ConfigService,
    private auth: AuthService,
  ) { }


}
