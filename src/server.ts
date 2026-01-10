import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ FIXED Health Check
app.get('/api/health', async (req, res) => {
  try {
    await prisma.program.count();
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      models: ['Program', 'Term', 'Lesson', 'Assets']
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ status: 'ERROR', error: errorMessage });
  }
});

// ✅ Test endpoints
app.get('/api/programs', async (req, res) => {
  const programs = await prisma.program.findMany();
  res.json(programs);
});

app.get('/api/lessons', async (req, res) => {
  const lessons = await prisma.lesson.findMany();
  res.json(lessons);
});

// ✅ Fake auth (no User model needed)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@cms.com' && password === 'admin123') {
    res.json({ 
      token: 'fake-jwt-admin-token', 
      user: { id: '1', email, role: 'ADMIN' }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 CMS API running on http://localhost:${PORT}/api`);
});
