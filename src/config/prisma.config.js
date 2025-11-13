import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({         // kohalik muutuja "prisma" milles saame välja kutsuda igasugu asju 
  log: ['query']
}); 

export default prisma;