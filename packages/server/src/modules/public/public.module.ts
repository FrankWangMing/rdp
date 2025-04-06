import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaClient } from '@prisma/client'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    AuthModule,
    HttpModule
  ],
  providers: [PrismaClient],
  controllers: [],
  exports: [
    AuthModule,
    PrismaClient,
    HttpModule,
  ]
})
export class PublicModule { }
