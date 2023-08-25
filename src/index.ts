import "./types/index";
import { prisma } from "@db";
import { PORT } from "config";
import Fastify from "fastify";
import {
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from "fastify-type-provider-zod";
import { registerPlugin } from "services";
import { ZodAny } from "zod";

const fastify = Fastify({
    logger: {
        level: "warn",
    },
}).withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler<ZodAny>((routeSchema) => {
    if (routeSchema.url.includes("upload"))
        return () => ({
            value: true,
        });

    return validatorCompiler(routeSchema);
});
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(registerPlugin);

prisma.$connect().then(async () => {
    console.log("[DATABASE] database was connected!");

    const host = await fastify.listen({
        port: PORT,
        host: "::",
    });

    console.log(`[SERVER] Server has been started at ${host}`);
});
