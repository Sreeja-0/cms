// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 SEED STARTING - Connecting to database...');
  
  try {
    // Clear existing data first
    console.log('🧹 Clearing existing data...');
    await prisma.lesson.deleteMany({});
    await prisma.term.deleteMany({});
    await prisma.topic.deleteMany({});
    await prisma.program.deleteMany({});
    
    // Create Topics
    const introTopic = await prisma.topic.create({
      data: { name: 'Introduction to Programming' }
    });
    const dataTopic = await prisma.topic.create({
      data: { name: 'Data Structures' }
    });
    console.log('✅ Topics created:', introTopic.id, dataTopic.id);

    // Create Program
    const program = await prisma.program.create({
      data: {
        title: 'Complete Web Development - Telugu',
        description: 'Full-stack web development course in Telugu',
        languagePrimary: 'te',
        languagesAvailable: ['te', 'en'],
        topics: {
          connect: [{ id: introTopic.id }, { id: dataTopic.id }]
        }
      }
    });
    console.log('✅ Program created:', program.id, program.title);

    // Create Term
    const term = await prisma.term.create({
      data: {
        programId: program.id,
        termNumber: 1,
        title: 'Basics'
      }
    });
    console.log('✅ Term created:', term.id);

    // Create Lessons
    await prisma.lesson.create({
      data: {
        termId: term.id,
        lessonNumber: 1,
        title: 'What is Programming?',
        contentType: 'VIDEO',
        durationMs: 600000,
        contentLanguagePrimary: 'te',
        contentLanguagesAvailable: ['te', 'en'],
        contentUrlsByLanguage: {
          te: 'https://example.com/videos/te/lesson1.mp4',
          en: 'https://example.com/videos/en/lesson1.mp4'
        },
        status: 'PUBLISHED',
        publishedAt: new Date()
      }
    });

    await prisma.lesson.create({
      data: {
        termId: term.id,
        lessonNumber: 2,
        title: 'First HTML Page',
        contentType: 'ARTICLE',
        contentLanguagePrimary: 'te',
        contentLanguagesAvailable: ['te'],
        contentUrlsByLanguage: { te: 'https://example.com/articles/te/html1' },
        status: 'SCHEDULED',
        publishAt: new Date(Date.now() + 2 * 60 * 1000)
      }
    });

    console.log('🎉 SEED COMPLETE! 1 Program + 1 Term + 2 Lessons + 2 Topics');
    console.log('🔗 Test: https://cms-production-55ea.up.railway.app/api/api/api/programs');
    
  } catch (error) {
    console.error('💥 SEED FAILED:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch(e => {
    console.error('💥 FATAL ERROR:', e);
    process.exit(1);
  });

