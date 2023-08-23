import { FastifyZodInstance } from "@types";
import { schema } from "./user.schema";

export const get = async (fastify: FastifyZodInstance) => {
    fastify.post(
        "/user/info",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const token = fastify.jwt.sign({
                id: req.user!.id,
            });

            return res.send({
                id: req.user!.id,
                firstName: req.user!.firstName,
                lastName: req.user!.lastName,
                token,
            });
        },
    );
};
