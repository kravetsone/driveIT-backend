import z from "zod";

const params = z.object({
    shipId: z.preprocess(Number, z.number()),
});

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z
    .object({
        id: z.number(),
        name: z.string(),
        schedule: z.array(
            z.object({
                id: z.number(),
                time: z.string(),
                stopName: z.string(),
            }),
        ),
    })
    .describe("Получение корабля и его расписания");

export const schema = {
    description: "Получение корабля и его расписания",
    tags: ["ship"],
    security: [{ bearerAuth: [] }],
    params,
    response: {
        200: response,
        401: userNotExists,
    },
};
