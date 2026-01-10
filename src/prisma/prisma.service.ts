import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
  await this.$connect();
  this.logger.log('✅ Prisma connected to PostgreSQL');
  
  // 🔥 FIX: Create CORRECT table name for Prisma
  await this.$executeRaw`
    CREATE TABLE IF NOT EXISTS programs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      description TEXT,
      language_primary TEXT NOT NULL,
      languages_available TEXT[] DEFAULT '{}',
      status TEXT DEFAULT 'DRAFT',
      published_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  this.logger.log('✅ programs table created/verified');
}


  async onModuleDestroy() {
    await this.$disconnect();
  }
}
