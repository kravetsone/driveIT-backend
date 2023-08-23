import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";

export function registerAuth(
    fastify: FastifyZodInstance,
    _opts: unknown,
    done,
) {
    fastify.decorate("auth", (getUser = false) => {
        return async (req: FastifyRequest, res: FastifyReply) => {
            console.log(req.headers);
            await req.jwtVerify().catch(() => {
                return res.status(401).send({
                    code: "NO_AUTH",
                    message: "Вы не авторизовались",
                });
            });

            if (getUser) {
                req.user = await prisma.user.findUnique({
                    where: { id: req.jwtUser.id },
                });

                if (!req.user)
                    return res.status(401).send({
                        code: "NO_AUTH",
                        message: "Вы не авторизовались",
                    });
            }
        };
    });

    done();
}

export const othersPlugin = fastifyPlugin(registerAuth, {
    name: "auth-decorator-plugin",
});
