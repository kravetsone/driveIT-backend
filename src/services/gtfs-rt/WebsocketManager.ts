import { SocketStream } from "@fastify/websocket";
import { FeedMessage } from "./proto";

const clients: SocketStream[] = [];

export class WebsocketManager {
    static add(connection: SocketStream) {
        clients.push(connection);
    }

    static broadcastGTFS(data: FeedMessage) {
        clients.forEach((client) =>
            client.socket.send(FeedMessage.toBinary(data)),
        );
    }
}
