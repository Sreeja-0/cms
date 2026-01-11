async function main() {
  console.log('🌱 Starting seed...');
  
  try {
    // Clear existing data (DEBUG)
    await prisma.program.deleteMany();
    await prisma.term.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.topic.deleteMany();
    console.log('🧹 Cleared existing data');

    // Create Topics
    const introTopic = await prisma.topic.create({
      data: { name: 'Introduction to Programming' }
    });
    console.log('✅ Topic1 created:', introTopic.id);

    const dataTopic = await prisma.topic.create({
      data: { name: 'Data Structures' }
    });
    console.log('✅ Topic2 created:', dataTopic.id);

    // Create Program
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
    console.log('✅ Program created:', program1.id);

    // Rest of seed...
    console.log('🎉 SEED COMPLETE! Check Railway Postgres UI');
  } catch (error) {
    console.error('💥 SEED FAILED:', error);
    throw error;
  }
}


