import z from "zod";

const params = z.object({
    routeId: z.preprocess(Number, z.number()),
});

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z
    .object({
        shortName: z.string(),
        longName: z.string(),
        stops: z.array(
            z.object({
                id: z.string(),
                name: z.string(),
                lat: z.number(),
                lon: z.number(),
            }),
        ),
    })
    .describe("Список остановок маршурута");

export const schema = {
    description: "Получение маршурута и его остановок",
    tags: ["route"],
    security: [{ bearerAuth: [] }],
    params,
    response: {
        200: response,
        401: userNotExists,
    },
};
