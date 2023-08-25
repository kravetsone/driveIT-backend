import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./list.schema";

export const updateUser = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/stop/list",
        {
            schema,
            preHandler: fastify.auth(),
        },
        async (req, res) => {
            const { page, pageSize, query } = req.query;

            const [items, count] = await prisma.stop.findManyAndCount({
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
                    lat: true,
                    lon: true,
                },
            });
            return res.send({
                pageCount: count,
                items: items.filter((item) => !item.id.includes("_")),
            });
        },
    );
};
