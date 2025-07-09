import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async login({ email, name }: { email: string; name: string }) {
    // Implement login logic here, e.g., validate user credentials
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user || user.name !== name) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
}
