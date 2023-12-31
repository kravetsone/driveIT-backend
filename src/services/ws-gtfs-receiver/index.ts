import fs from "fs/promises";
import { GTFS_WS_HOST } from "@config";
import { prisma } from "@db";
import {
    GTFSFiles,
    IAgencyDataGTFS,
    ICalendarDataGTFS,
    IGtfsRTMessage,
    IRouteDataGTFS,
    IShipDataGTFS,
    IStopDataGTFS,
    IStopTimeDataGTFS,
    ITripDataGTFS,
} from "@types";
import csv from "csvtojson";
import { WebsocketManager } from "services/gtfs-rt";
import unzipper from "unzipper";
import WebSocket from "ws";

export const gtfsReceiver: { ws?: WebSocket } = {};

async function parseFile(file) {
    console.log(file.path);
    const buffer = await file.buffer();
    const data = await csv({
        checkType: true,
        flatKeys: true,
        ignoreEmpty: true,
    }).fromString(buffer.toString());

    if (file.path === GTFSFiles.AGENCY) {
        const agencyData = data as IAgencyDataGTFS[];

        await prisma.agency.createMany({
            data: agencyData.map((data) => ({
                id: data.agency_id,
                name: data.agency_name,
                url: data.agency_url,
                timezone: data.agency_timezone,
                lang: data.agency_lang,
            })),
        });
    } else if (file.path === GTFSFiles.CALENDAR) {
        const calendarData = data as ICalendarDataGTFS[];

        await prisma.calendar.createMany({
            data: calendarData.map((data) => ({
                serviceId: data.service_id,
                isMonday: !!data.monday,
                isTuesday: !!data.tuesday,
                isThursday: !!data.thursday,
                isSaturday: !!data.saturday,
                isFriday: !!data.friday,
                isSunday: !!data.sunday,
                isWednesday: !!data.wednesday,
                startDate: data.start_date,
                endDate: data.end_date,
            })),
        });
    } else if (file.path === GTFSFiles.STOPS) {
        const stopsData = data as IStopDataGTFS[];

        await prisma.stop.createMany({
            data: stopsData.map((data) => ({
                id: String(data.stop_id),
                name: data.stop_name,
                lat: data.stop_lat,
                lon: data.stop_lon,
                locationType: data.location_type,
                parentStation: data.parent_station
                    ? String(data.parent_station)
                    : null,
                platformCode: data.platform_code,
            })),
        });
    } else if (file.path === GTFSFiles.ROUTES) {
        const routesData = data as IRouteDataGTFS[];

        await prisma.route.createMany({
            data: routesData.map((data) => ({
                id: data.route_id,
                agencyId: data.agency_id,
                shortName: String(data.route_short_name),
                longName: data.route_long_name,
                type: data.route_type,
                url: data.route_url,
            })),
        });
    } else if (file.path === GTFSFiles.STOP_TIMES) {
        const stopTimesData = data as IStopTimeDataGTFS[];

        await prisma.stopTime.createMany({
            data: stopTimesData.map((data) => ({
                tripId: data.trip_id,
                arrivalTime: data.arrival_time,
                departureTime: data.departure_time,
                stopId: data.stop_id,
                stopSequence: data.stop_sequence,
                stopHeadsign: data.stop_headsign,
            })),
        });
    } else if (file.path === GTFSFiles.TRIPS) {
        const tripsData = data as ITripDataGTFS[];

        await prisma.trip.createMany({
            data: tripsData.map((data) => ({
                routeId: data.route_id,
                serviceId: data.service_id,
                id: data.trip_id,
            })),
        });
    } else if (file.path === GTFSFiles.AMINITY) {
        const shipsData = data as IShipDataGTFS[];

        await prisma.ship.createMany({
            data: shipsData.map((data) => ({
                id: data.ship_id,
                name: data.ship_name,
            })),
        });
    }
}

function connect() {
    console.log("[WS-GTFS-RECEIVER] reconnecting...");
    gtfsReceiver.ws = new WebSocket(GTFS_WS_HOST);

    gtfsReceiver.ws.on("open", () => {
        gtfsReceiver.ws!.send("reqgtfs");
        console.log(
            "[WS-GTFS-RECEIVER] Ready to get data from the processing and enrichment service",
        );
    });

    gtfsReceiver.ws.on("message", async (data) => {
        console.log("received:", data);
        try {
            const gtfsData = JSON.parse(data.toString()) as IGtfsRTMessage;

            WebsocketManager.broadcastGTFS({
                entity: gtfsData.data.map((data) => ({
                    id: String(data.ts),
                    vehicle: {
                        vehicle: {
                            id: String(data.id),
                        },
                        position: {
                            latitude: data.lat,
                            longitude: data.lon,
                            speed: data.sog,
                            bearing: data.cog / 3.6, //переводим в из км/ч в м/с
                        },
                        timestamp: BigInt(data.ts),
                    },
                })),
            });
        } catch (error) {
            if (!Buffer.isBuffer(data)) return console.error("Not buffer");
            console.log("[WS-GTFS-RECEIVER] Пришёл буфер");
            fs.writeFile(process.cwd() + "/files/gtfs.zip", data);
            const directory = await unzipper.Open.buffer(data);

            await prisma.stopTime.deleteMany({ where: {} });
            await prisma.trip.deleteMany({ where: {} });
            await prisma.stop.deleteMany({ where: {} });
            await prisma.calendar.deleteMany({ where: {} });
            await prisma.route.deleteMany({ where: {} });
            await prisma.ship.deleteMany({ where: {} });
            await prisma.agency.deleteMany({ where: {} });

            const tasks = [
                async () =>
                    parseFile(
                        directory.files.find(
                            (x) => x.path === GTFSFiles.ROUTES,
                        )!,
                    ),
                async () =>
                    parseFile(
                        directory.files.find(
                            (x) => x.path === GTFSFiles.STOPS,
                        )!,
                    ),
                async () =>
                    parseFile(
                        directory.files.find(
                            (x) => x.path === GTFSFiles.TRIPS,
                        )!,
                    ),
                async () =>
                    parseFile(
                        directory.files.find(
                            (x) => x.path === GTFSFiles.STOP_TIMES,
                        )!,
                    ),
                async () =>
                    parseFile(
                        directory.files.find(
                            (x) => x.path === GTFSFiles.AMINITY,
                        )!,
                    ),
                async () =>
                    parseFile(
                        directory.files.find(
                            (x) => x.path === GTFSFiles.AGENCY,
                        )!,
                    ),
                async () =>
                    parseFile(
                        directory.files.find(
                            (x) => x.path === GTFSFiles.CALENDAR,
                        )!,
                    ),
            ];

            for (const fn of tasks) {
                await fn();
            }
        }
    });

    gtfsReceiver.ws.on("close", () => {
        setTimeout(connect, 1000);
    });

    gtfsReceiver.ws.on("error", () => 1);
}

connect();
