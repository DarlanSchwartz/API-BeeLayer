// Importando o PrismaClient do pacote '@prisma/client'
import { PrismaClient } from '@prisma/client';

// Criando uma instância do PrismaClient
const prisma = new PrismaClient();

// Exportando a instância do PrismaClient como um módulo padrão
export default prisma;