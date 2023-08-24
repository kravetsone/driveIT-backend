import { PrismaClient } from "@prisma/client";
import {
    deleteAndCreateManyExtenstion,
    findManyAndCountExtenstion,
    userModelExtension,
} from "./extensions";

const prisma = new PrismaClient()
    .$extends(userModelExtension)
    .$extends(findManyAndCountExtenstion)
    .$extends(deleteAndCreateManyExtenstion);

export * from "@prisma/client";
export { prisma };
