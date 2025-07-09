import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LibModule } from './lib/lib.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, LibModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
