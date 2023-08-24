import { config } from "@config";
import { prisma } from "@db";
import { UserRole } from "@prisma/client";
import { FastifyZodInstance } from "@types";
import { schema } from "./list.schema";

export const updateUser = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/admin/user/list",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const { page, pageSize } = req.query;

            if (req.user!.role !== UserRole.ADMIN)
                return res.status(400).send({
                    code: "NO_RIGHTS",
                    message: "У вас нет прав на получение юзера.",
                });

            const [items, count] = await prisma.user.findManyAndCount({
                skip: (+page - 1) * +pageSize,
                take: pageSize,
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    login: true,
                    role: true,
                },
            });
            return res.send({
                pageCount: count,
                items,
            });
            return res.status(400).send({
                code: "Вы дебил",
                message: "Вам противопоказано пользование этим сервисом.",
            });

            // const deleteUser = await prisma.user.findFirst({
            //     where: {
            //         id,
            //     },
            // });
            // if (!deleteUser)
            //     return res.status(400).send({
            //         code: "USER_NOT_EXISTS",
            //         message: "Этого пользователя не существует",
            //     });

            // await prisma.user.delete({
            //     where: {
            //         id,
            //     },
            // });
            // return res.send({
            //     message: "Пользователь успешно удалён",
            // });
        },
    );
};
