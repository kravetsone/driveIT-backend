import { PrismaClient } from "@prisma/client";
import { findManyAndCountExtenstion, userModelExtension } from "./extensions";

const prisma = new PrismaClient()
    .$extends(userModelExtension)
    .$extends(findManyAndCountExtenstion);

export * from "@prisma/client";
export { prisma };
