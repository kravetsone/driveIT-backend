import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./info.schema";

export const getRoute = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/ship/:shipId",
        {
            schema,
            preHandler: fastify.auth(),
        },
        async (req, res) => {
            const { shipId } = req.params;

            const ship = await prisma.ship.findFirst({
                where: {
                    id: shipId,
                },
            });
            if (!ship)
                return res.status(400).send({
                    code: "SHIP_NOT_EXISTS",
                    message: "Данного корабля не существует",
                });
            const schedule = await prisma.stopTime.findMany({
                where: {
                    stopHeadsign: ship.id + "_" + ship.name,
                },
                include: {
                    stop: {
                        select: {
                            name: true,
                        },
                    },
                },
            });

            console.log(schedule);

            return res.send({
                id: ship.id,
                name: ship.name,
                schedule: schedule.map((data) => ({
                    id: data.id,
                    time: data.arrivalTime.split(":").slice(0, 2).join(":"),
                    stopName: data.stop.name.split("_").at(0)!,
                })),
            });
        },
    );
};
