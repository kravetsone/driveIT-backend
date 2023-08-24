import { FastifyZodInstance } from "@types";
import { schema } from "./user.schema";

export const get = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/user/info",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const user = req.user!;
            const token = fastify.jwt.sign({
                id: user.id,
            });

            return res.send({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                token,
            });
        },
    );
};
