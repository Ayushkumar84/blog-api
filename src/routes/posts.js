import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Create post
router.post('/', async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const post = await prisma.post.create({
      data: { title, content, userId },
    });
    console.log(post);
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all posts with author
router.get('/', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json(posts);
});

export default router;
