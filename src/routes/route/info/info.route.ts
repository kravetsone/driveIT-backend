import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./info.schema";

export const getRoute = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/route/:routeId",
        {
            schema,
            preHandler: fastify.auth(),
        },
        async (req, res) => {
            const { routeId } = req.params;

            const route = await prisma.route.findFirst({
                where: {
                    id: routeId,
                },
            });
            if (!route)
                return res.status(400).send({
                    code: "ROUTE_NOT_EXISTS",
                    message: "Данного маршрута не существует",
                });
            const trip = await prisma.trip.findFirstOrThrow({
                where: {
                    routeId: route.id,
                },
            });

            const stopTimes = await prisma.stopTime.findMany({
                where: {
                    tripId: trip.id,
                },
            });

            const uniqueStopIDS = [
                ...new Set(
                    stopTimes.map(({ stopId }) => stopId.split("_").at(0)),
                ),
            ];

            const stops = await prisma.stop.findMany({
                where: {
                    OR: uniqueStopIDS.map((stopId) => ({ id: stopId })),
                },
                select: {
                    id: true,
                    name: true,
                    lat: true,
                    lon: true,
                },
            });

            return res.send({
                shortName: route.shortName,
                longName: route.longName,
                stops,
            });
        },
    );
};
