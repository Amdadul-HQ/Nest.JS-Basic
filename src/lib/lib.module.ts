import { Module } from '@nestjs/common';
import { LibController } from './lib.controller';

@Module({
  controllers: [LibController]
})
export class LibModule {}
