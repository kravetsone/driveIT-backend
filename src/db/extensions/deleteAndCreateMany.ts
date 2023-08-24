import { prisma } from "@db/prisma";
import { Prisma } from "@prisma/client";

export const deleteAndCreateManyExtenstion = {
    model: {
        $allModels: {
            deleteAndCreateMany<Model, Args>(
                this: Model,
                args: Prisma.Exact<Args, Prisma.Args<Model, "createMany">>,
            ): Promise<Prisma.Result<Model, Args, "createMany">> {
                return prisma.$transaction([
                    (this as any).deleteMany({ where: {} }),
                    (this as any).createMany({ data: (args as any).data }),
                ]) as any;
            },
        },
    },
};
