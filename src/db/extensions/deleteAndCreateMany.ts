import { prisma } from "@db/prisma";
import { Prisma } from "@prisma/client";

export const deleteAndCreateManyExtenstion = {
    model: {
        $allModels: {
            async deleteAndCreateMany<Model, Args>(
                this: Model,
                args: Prisma.Exact<Args, Prisma.Args<Model, "createMany">>,
            ): Promise<Prisma.Result<Model, Args, "createMany">> {
                return [
                    await (this as any).deleteMany({ where: {} }),
                    await (this as any).createMany({
                        data: (args as any).data,
                    }),
                ] as any;
            },
        },
    },
};
