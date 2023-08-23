import fs from "fs/promises";
import { WebsocketManager } from "services/gtfs-rt";
import unzipper from "unzipper";
import WebSocket from "ws";

const ws = new WebSocket("ws://localhost");

ws.on("open", () => {
    console.log(
        "[WS-GTFS-RECEIVER] Ready to get data from the processing and enrichment service",
    );
});

ws.on("message", async (data) => {
    console.log("received:", data);
    if (Buffer.isBuffer(data)) {
        console.log("[WS-GTFS-RECEIVER] Пришёл буфер");
        fs.writeFile(process.cwd() + "/gtfs.zip", data);
        const directory = await unzipper.Open.buffer(data);
        console.log("directory", directory);
        return;
    }
    if (typeof data !== "string")
        return console.error("[WS-GTFS-RECEIVER] Ни буфер ни строка...");

    const gtfsData = JSON.parse(data);

    WebsocketManager.broadcastGTFS({ entity: [{ id: "2" }] });
});

ws.on("error", console.error);
