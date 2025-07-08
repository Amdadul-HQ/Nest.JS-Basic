import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers() {
    return await this.prisma.user.findMany();
  }
  async getUserById(id: number) {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }
  async createUser(data: { name: string; email: string }) {
    return await this.prisma.user.create({
      data,
    });
  }
  async updateUser(id: number, data: { name?: string; email?: string }) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
