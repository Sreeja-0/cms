// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Create Topics (individual creates for IDs)
  const introTopic = await prisma.topic.create({
    data: { name: 'Introduction to Programming' }
  });
  const dataTopic = await prisma.topic.create({
    data: { name: 'Data Structures' }
  });

  // 2. Create Program 1 (Telugu)
  const program1 = await prisma.program.create({
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

  // 3. Create Term 1
  const term1 = await prisma.term.create({
    data: {
      programId: program1.id,
      termNumber: 1,
      title: 'Basics'
    }
  });

  // 4. Create Lessons
  await prisma.lesson.create({
    data: {
      termId: term1.id,
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
      termId: term1.id,
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

  console.log('✅ Seed COMPLETE! 1 Program + 1 Term + 2 Lessons + Topics');
}

main()
  .catch(e => console.error('Seed error:', e))
  .finally(async () => await prisma.$disconnect());

