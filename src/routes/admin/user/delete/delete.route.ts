import { config } from "@config";
import { prisma } from "@db";
import { UserRole } from "@prisma/client";
import { FastifyZodInstance } from "@types";
import { schema } from "./delete.schema";

export const createUser = async (fastify: FastifyZodInstance) => {
    fastify.delete(
        "/admin/user/delete",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const { id } = req.body;

            const user = req.user!;
            if (user.role !== UserRole.ADMIN)
                return res.status(400).send({
                    code: "NO_RIGHTS",
                    message: "У вас нет прав на создание аккаунта.",
                });

            const deleteUser = await prisma.user.findFirst({
                where: {
                    id,
                },
            });
            if (!deleteUser)
                return res.status(400).send({
                    code: "USER_NOT_EXISTS",
                    message: "Этого пользователя не существует",
                });

            await prisma.user.delete({
                where: {
                    id,
                },
            });
            return res.send({
                message: "Пользователь успешно удалён",
            });
        },
    );
};
