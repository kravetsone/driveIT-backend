import { prisma, UserRole } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./get.schema";

export const get = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/admin/user/:userId",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const { userId } = req.params;

            if (req.user!.role !== UserRole.ADMIN)
                return res.status(400).send({
                    code: "NO_RIGHTS",
                    message: "У вас нет прав на получение юзера.",
                });

            const user = await prisma.user.findFirst({
                where: {
                    id: userId,
                },
            });
            if (!user)
                return res.status(401).send({
                    code: "USER_NOT_EXISTS",
                    message: "Введённые вами логин или пароль неверны",
                });

            return res.send({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            });
        },
    );
};
