import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.program.create({
    where: { email: 'editor@example.com' },
    update: {},
    create: {
      email: 'editor@example.com',
      passwordHash: 'password123',
      role: 'editor'
    }
  });
  
  // Create a test lesson
  await prisma.lesson.create({
    data: {
      title: 'Welcome Lesson',
      content: 'This is your first CMS lesson!',
      status: "PUBLISHED",
      userId: 1
    }
  });
  
  console.log('✅ SEED COMPLETE! User: editor@example.com / password123');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

