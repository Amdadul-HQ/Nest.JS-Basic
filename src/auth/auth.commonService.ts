import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthCommonService {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public generateToken(user: { email: string; name: string }) {
    const payload = {
      email: user.email,
      name: user.name,
    };
    return this.jwt.signAsync(payload, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
      expiresIn: '7d',
    });
  }
}
