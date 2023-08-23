import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./signIn.schema";

export const get = async (fastify: FastifyZodInstance) => {
    fastify.post(
        "/auth/signIn",
        {
            schema,
        },
        async (req, res) => {
            const { login, password } = req.body;

            const user = await prisma.user.signIn({
                login,
                password,
            });
            if (!user)
                return res.status(401).send({
                    code: "USER_NOT_EXISTS",
                    message: "Введённые вами логин или пароль неверны",
                });

            const token = fastify.jwt.sign({
                id: user.id,
            });

            return res.send({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                token,
            });
        },
    );
};
