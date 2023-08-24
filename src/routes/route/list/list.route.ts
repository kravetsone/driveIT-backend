import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./list.schema";

export const updateUser = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/route/list",
        {
            schema,
            preHandler: fastify.auth(),
        },
        async (req, res) => {
            const { page, pageSize, query } = req.query;

            const [items, count] = await prisma.route.findManyAndCount({
                where: {
                    longName: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
                skip: (+page - 1) * +pageSize,
                take: pageSize,
                select: {
                    id: true,
                    shortName: true,
                    longName: true,
                },
            });
            return res.send({
                pageCount: count,
                items,
            });
        },
    );
};
