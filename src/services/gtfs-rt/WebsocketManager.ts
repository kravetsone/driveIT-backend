import { SocketStream } from "@fastify/websocket";
import { gtfsReceiver } from "services/ws-gtfs-receiver";
import { FeedMessage } from "./proto";

const clients: SocketStream[] = [];

export class WebsocketManager {
    static add(connection: SocketStream) {
        if (gtfsReceiver.ws) gtfsReceiver.ws.send("reqctm");

        clients.push(connection);
    }

    static broadcastGTFS(data: FeedMessage) {
        clients.forEach((client) =>
            client.socket.send(FeedMessage.toBinary(data)),
        );
    }
}
