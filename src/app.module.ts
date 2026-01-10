import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health/health.controller';
import { ProgramsController } from './programs/programs.controller';
import { PrismaService } from './prisma/prisma.service';
import { PublishingWorker } from './worker/publishing.worker'; 
@Module({
  imports: [],
  controllers: [HealthController, ProgramsController],
  providers: [PrismaService,  PublishingWorker],
})
export class AppModule {}
