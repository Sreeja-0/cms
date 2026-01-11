import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health/health.controller';
import { ProgramsController } from './programs/programs.controller';
import { PublishingWorker } from './worker/publishing.worker';

@Module({
  imports: [PrismaModule],
  controllers: [HealthController, ProgramsController],
  providers: [PublishingWorker],
})
export class AppModule {}
