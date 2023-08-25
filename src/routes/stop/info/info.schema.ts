import z from "zod";

const params = z.object({
    stopId: z.preprocess(Number, z.number()),
});

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z
    .object({
        name: z.string(),
        routes: z.array(z.string()),
        schedule: z.array(
            z.object({
                id: z.number(),
                time: z.string(),
                routeName: z.string(),
                tripId: z.number(),
                shipName: z.string(),
            }),
        ),
    })
    .describe("Остановки и маршурут с расписанием");

export const schema = {
    description: "Получение остановки и его маршурута с расписанием",
    tags: ["stop"],
    security: [{ bearerAuth: [] }],
    params,
    response: {
        200: response,
        401: userNotExists,
    },
};
