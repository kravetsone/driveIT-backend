import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./info.schema";

export const getRoute = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/stop/:stopId",
        {
            schema,
            preHandler: fastify.auth(),
        },
        async (req, res) => {
            const { stopId } = req.params;

            const schedule = await prisma.stopTime.findMany({
                where: {
                    stopId: {
                        startsWith: String(stopId),
                    },
                },
                include: {
                    trip: {
                        include: {
                            route: {
                                select: { shortName: true },
                            },
                        },
                    },
                },
            });
            console.log(schedule);
            const routesShortNames = [
                ...new Set(
                    schedule.map((stopTime) => stopTime.trip.route.shortName),
                ),
            ];

            return res.send({
                routes: routesShortNames,
                schedule: schedule.map((data) => ({
                    id: data.id,
                    time: data.arrivalTime.split(":").slice(0, 2).join(":"),
                    routeName: data.trip.route.shortName,
                    tripId: data.tripId,
                })),
            });
        },
    );
};
