import fs from "fs/promises";
import { prisma } from "@db";
import { GTFSFiles } from "@types";
import csv from "csvtojson";
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

        directory.files.forEach(async (file) => {
            const data = await csv({
                checkType: true,
                flatKeys: true,
                ignoreEmpty: true,
            }).fromString(file.buffer.toString());
            console.log(data);

            if (file.path === GTFSFiles.AGENCY) {
                // await prisma.agency.deleteAndCreateMany({ data: [] });
            } else if (file.path === GTFSFiles.CALENDAR) {
                // await prisma.calendar.deleteAndCreateMany({data: []})
            } else if (file.path === GTFSFiles.STOPS) {
                // await prisma.stop.deleteAndCreateMany({data: []})
            } else if (file.path === GTFSFiles.ROUTES) {
                // await prisma.route.deleteAndCreateMany({data: []})
            }
        });
        return;
    }
    if (typeof data !== "string")
        return console.error("[WS-GTFS-RECEIVER] Ни буфер ни строка...");

    const gtfsData = JSON.parse(data);
    console.log(gtfsData);

    WebsocketManager.broadcastGTFS({ entity: [{ id: "2" }] });
});

ws.on("error", console.error);
