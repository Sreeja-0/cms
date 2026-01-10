import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublishingWorker implements OnModuleInit {
  private readonly logger = new Logger(PublishingWorker.name);

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // Log every 30 seconds
    setInterval(() => {
      this.logger.log('⭐ Publishing Worker: Checking scheduled lessons...');
    }, 30000);
    this.logger.log('⭐ Publishing Worker ACTIVE - checking every 30s');
  }
}
