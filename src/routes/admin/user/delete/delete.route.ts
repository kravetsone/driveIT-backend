import { prisma } from "@db";
import { UserRole } from "@prisma/client";
import { FastifyZodInstance } from "@types";
import { schema } from "./delete.schema";

export const createUser = async (fastify: FastifyZodInstance) => {
    fastify.delete(
        "/admin/user/:userId/delete",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const { userId } = req.params;

            const user = req.user!;
            if (user.role !== UserRole.ADMIN)
                return res.status(400).send({
                    code: "NO_RIGHTS",
                    message: "У вас нет прав на создание аккаунта.",
                });

            const deleteUser = await prisma.user.findFirst({
                where: {
                    id: userId,
                },
            });
            if (!deleteUser)
                return res.status(400).send({
                    code: "USER_NOT_EXISTS",
                    message: "Этого пользователя не существует",
                });

            await prisma.user.delete({
                where: {
                    id: userId,
                },
            });
            return res.send({
                message: "Пользователь успешно удалён",
            });
        },
    );
};
