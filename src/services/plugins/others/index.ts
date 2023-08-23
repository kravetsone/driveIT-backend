import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyStatic from "@fastify/static";
// import fastifyRedis from "@fastify/redis";
import { FastifyZodInstance } from "@types";
import fastifyMulter from "fastify-multer";
import fastifyPlugin from "fastify-plugin";

async function registerOthers(fastify: FastifyZodInstance) {
    await fastify.register(fastifyCors);
    await fastify.register(fastifyJwt, {
        secret: "supersecret",
        decoratorName: "jwtUser",
    });
    await fastify.register(fastifyStatic, {
        root: process.cwd() + "/files",
        prefix: "/",
    });
    await fastify.register(fastifyMulter.contentParser);
}

export const othersPlugin = fastifyPlugin(registerOthers, {
    name: "others-import-plugin",
});
