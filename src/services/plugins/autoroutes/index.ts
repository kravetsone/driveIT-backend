import { FastifyZodInstance, TRoute } from "@types";
import fastifyPlugin from "fastify-plugin";
import { glob } from "glob";

async function registerAutoroutes(fastify: FastifyZodInstance) {
    const routes = await glob(`${process.cwd()}/dist/routes/**/*.route.js`, {
        absolute: true,
    });
    await Promise.all(
        routes.map(async (route) => {
            const file = await import(route);
            const endpoint = Object.values(file).at(0);

            await fastify.register(endpoint as TRoute);
        }),
    );
}

export const autoroutesPlugin = fastifyPlugin(registerAutoroutes, {
    name: "autoroutes-plugin",
});
