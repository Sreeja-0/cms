// prisma/seed.ts - ULTRA-SIMPLE DEBUG VERSION
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 SEED STARTED - Connecting to DB...');
  
  try {
    // TEST 1: Check if tables exist
    const programsCount = await prisma.program.count();
    console.log('📊 Programs table exists:', programsCount);
    
    const topicsCount = await prisma.topic.count();
    console.log('📊 Topics table exists:', topicsCount);
    
    if (topicsCount === 0) {
      console.log('🌱 Creating FIRST-EVER seed data...');
      
      // Create 1 simple program (NO relations)
      const program = await prisma.program.create({
        data: {
          title: 'Test Program Telugu',
          description: 'Simple seed test',
          languagePrimary: 'te',
          languagesAvailable: ['te']
        }
      });
      console.log('✅ PROGRAM CREATED:', program.id, program.title);
    }
    
    console.log('🎉 SEED COMPLETE! Test API now.');
  } catch (error) {
    console.error('💥 SEED CRASHED:', error.message);
    console.error('💥 FULL ERROR:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(e => {
  console.error('💥 FATAL:', e);
  process.exit(1);
});
