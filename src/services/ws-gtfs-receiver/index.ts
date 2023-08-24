import fs from "fs/promises";
import { prisma } from "@db";
import {
    GTFSFiles,
    IAgencyDataGTFS,
    ICalendarDataGTFS,
    IRouteDataGTFS,
    IStopDataGTFS,
    IStopTimeDataGTFS,
    ITripDataGTFS,
} from "@types";
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
                const agencyData = data as IAgencyDataGTFS[];

                await prisma.agency.deleteAndCreateMany({
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

                await prisma.calendar.deleteAndCreateMany({
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

                await prisma.stop.deleteAndCreateMany({
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

                await prisma.route.deleteAndCreateMany({
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

                await prisma.stopTime.deleteAndCreateMany({
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

                await prisma.trip.deleteAndCreateMany({
                    data: tripsData.map((data) => ({
                        routeId: data.route_id,
                        serviceId: data.service_id,
                        tripId: data.trip_id,
                    })),
                });
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
