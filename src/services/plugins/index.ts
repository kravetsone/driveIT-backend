import { FastifyZodInstance } from "@types";
import fastifyPlugin from "fastify-plugin";
import { registerGtfsRTPlugin } from "services/gtfs-rt";
import { registerAuth } from "./auth";
import { autoroutesPlugin } from "./autoroutes";
import { errorHandlerPlugin } from "./errorHandler";
import { othersPlugin } from "./others";
import { swaggerPlugin } from "./swagger";

async function registerPlugins(fastify: FastifyZodInstance) {
    await fastify.register(othersPlugin);
    await fastify.register(swaggerPlugin);
    await fastify.register(registerAuth);
    await fastify.register(errorHandlerPlugin);
    await fastify.register(autoroutesPlugin);
    await fastify.register(registerGtfsRTPlugin);

    fastify.addHook("preHandler", async (req) => {
        console.log(`[${req.method}]`, req.url, req.body || req.query);
    });
}

export const registerPlugin = fastifyPlugin(registerPlugins, {
    name: "register-plugin",
});
