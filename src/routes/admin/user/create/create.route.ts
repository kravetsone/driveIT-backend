import { config } from "@config";
import { prisma } from "@db";
import { UserRole } from "@prisma/client";
import { FastifyZodInstance } from "@types";
import bcrypt from "bcrypt";
import { schema } from "./create.schema";

export const createUser = async (fastify: FastifyZodInstance) => {
    fastify.post(
        "/admin/user/create",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const { login, password, firstName, lastName } = req.body;

            const user = req.user!;
            if (user.role !== UserRole.ADMIN)
                return res.status(400).send({
                    code: "NO_RIGHTS",
                    message: "У вас нет прав на создание аккаунта.",
                });

            const newUser = await prisma.user.create({
                data: {
                    login,
                    password: bcrypt.hashSync(password, config.saltRounds),
                    firstName,
                    lastName,
                },
            });
            return res.send({
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role,
            });
        },
    );
};
