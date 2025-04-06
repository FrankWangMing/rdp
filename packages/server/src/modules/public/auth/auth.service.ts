import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Token } from './models/token.model'
import { SecurityConfig } from 'src/common/configs/config.interface'
import { PrismaService } from 'nestjs-prisma'
import { log } from 'console'
import { User } from '@prisma/client'
import { JwtDto } from './jwt.dto'
import { IPayload } from './interfaces'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private prisma: PrismaService
  ) { }

  async generateTokens(payload: IPayload): Promise<Token> {
    return {
      accessToken: await this.generateAccessToken(payload),
      refreshToken: await this.generateRefreshToken(payload)
    }
  }

  private async generateAccessToken(payload: IPayload): Promise<string> {
    log(this.configService.get('JWT_REFRESH_SECRET'))
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: 86400000
    })
  }

  private async generateRefreshToken(payload: IPayload): Promise<string> {
    const securityConfig = this.configService.get<SecurityConfig>('security')
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn
    })
  }

  refreshToken(token: string) {
    try {
      const { email } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET')
      })
      return this.generateTokens({
        email,
      })
    } catch (e) {
      throw new UnauthorizedException()
    }
  }

  async validateUser(payload: JwtDto): Promise<User> {
    const userInfo = await this.prisma.user.findUnique({
      where: { email: payload.email }
    })
    return await userInfo
  }
}
