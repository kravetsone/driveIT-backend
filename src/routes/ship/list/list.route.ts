import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./list.schema";

export const updateUser = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/ship/list",
        {
            schema,
            preHandler: fastify.auth(),
        },
        async (req, res) => {
            const { page, pageSize, query } = req.query;

            const [items, count] = await prisma.ship.findManyAndCount({
                where: {
                    AND: [
                        {
                            name: {
                                contains: query,
                                mode: "insensitive",
                            },
                        },
                    ],
                },
                skip: (+page - 1) * +pageSize,
                take: pageSize,
                select: {
                    id: true,
                    name: true,
                },
            });
            return res.send({
                pageCount: count,
                items,
            });
        },
    );
};
