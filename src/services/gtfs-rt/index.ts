import fastifyWebsocket from "@fastify/websocket";
import { FastifyZodInstance } from "@types";
import fastifyPlugin from "fastify-plugin";
import { WebsocketManager } from "./WebsocketManager";

export * from "./WebsocketManager";

async function registerGtfsRT(fastify: FastifyZodInstance) {
    await fastify.register(fastifyWebsocket);

    fastify.get(
        "/",
        { websocket: true, schema: { hide: true } },
        (connection) => {
            WebsocketManager.add(connection);
            connection.socket.on("message", (message) => {
                WebsocketManager.broadcastGTFS({ entity: [{ id: "2" }] });
            });
        },
    );
}

export const registerGtfsRTPlugin = fastifyPlugin(registerGtfsRT, {
    name: "registerGtfsRT",
});
