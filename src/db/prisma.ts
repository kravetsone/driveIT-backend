import { PrismaClient } from "@prisma/client";
import { userModelExtension } from "./extensions";

const prisma = new PrismaClient().$extends(userModelExtension);

export * from "@prisma/client";
export { prisma };
