// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Topics
  const topics = await prisma.topic.createMany({
    data: [
      { name: 'Introduction to Programming' },
      { name: 'Data Structures' },
      { name: 'Algorithms' }
    ]
  });

  // Create Program 1 (Telugu)
  const program1 = await prisma.program.create({
    data: {
      title: 'Complete Web Development - Telugu',
      description: 'Full-stack web development course in Telugu',
      languagePrimary: 'te',
      languagesAvailable: ['te', 'en'],
      topics: {
        connect: [{ name: 'Introduction to Programming' }, { name: 'Data Structures' }]
      }
    }
  });

  // Create Program 2 (English)  
  const program2 = await prisma.program.create({
    data: {
      title: 'Advanced React Patterns',
      description: 'Master React with hooks and patterns',
      languagePrimary: 'en',
      languagesAvailable: ['en'],
      topics: {
        connect: [{ name: 'Introduction to Programming' }]
      }
    }
  });

  // Create Terms
  const term1 = await prisma.term.create({
    data: {
      programId: program1.id,
      termNumber: 1,
      title: 'Basics'
    }
  });

  // Create Lessons with multi-language + assets
  await prisma.lesson.createMany({
    data: [
      {
        termId: term1.id,
        lessonNumber: 1,
        title: 'What is Programming?',
        contentType: 'VIDEO',
        durationMs: 600000, // 10 mins
        contentLanguagePrimary: 'te',
        contentLanguagesAvailable: ['te', 'en'],
        contentUrlsByLanguage: {
          te: 'https://example.com/videos/te/lesson1.mp4',
          en: 'https://example.com/videos/en/lesson1.mp4'
        },
        status: 'PUBLISHED',
        publishedAt: new Date()
      },
      {
        termId: term1.id,
        lessonNumber: 2,
        title: 'First HTML Page',
        contentType: 'ARTICLE',
        contentLanguagePrimary: 'te',
        contentLanguagesAvailable: ['te'],
        contentUrlsByLanguage: { te: 'https://example.com/articles/te/html1' },
        status: 'SCHEDULED',
        publishAt: new Date(Date.now() + 2 * 60 * 1000) // 2 mins from now
      }
    ]
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());


