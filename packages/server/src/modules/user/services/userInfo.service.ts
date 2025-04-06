import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class UserInfoService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }


  async get(email: User['email']) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {}
    })
  }







}
