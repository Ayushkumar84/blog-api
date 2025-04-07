import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Create user
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({ data: { name, email } });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany({ include: { posts: true } });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const Id = req.params.id;
  try{
    const user = await prisma.user.findUnique({
      where: { id: Number(Id) },
      include : { posts: true },
    });

    if(!user){
      return res.status(404).json({ message: "User not Found" });
    }

    res.json(user);
  } catch(err){
    console.warn(err);
  }
});

export default router;
