import { config } from "@config";
import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import bcrypt from "bcrypt";
import { schema } from "./update.schema";

export const updateUser = async (fastify: FastifyZodInstance) => {
    fastify.post(
        "/admin/user/update",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            if ("password" in req.body) {
                req.body.password = bcrypt.hashSync(
                    req.body.password!,
                    config.saltRounds,
                );
            }

            const user = await prisma.user.update({
                where: {
                    id: req.body.id,
                },
                data: {
                    ...req.body,
                    id: undefined,
                },
            });
            return res.send({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
            });
        },
    );
};
