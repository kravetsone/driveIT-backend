import z from "zod";

const querystring = z.object({
    query: z.string().default(""),
    page: z.string().transform(Number).refine(Boolean).default("1"),
    pageSize: z.string().transform(Number).refine(Boolean).default("10"),
});

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z
    .object({
        pageCount: z.number(),
        items: z.array(
            z.object({
                id: z.string(),
                name: z.string(),
                lat: z.number(),
                lon: z.number(),
            }),
        ),
    })
    .describe("Список остановок");

export const schema = {
    description: "Получение списка остановок",
    tags: ["stop"],
    security: [{ bearerAuth: [] }],
    querystring,
    response: {
        200: response,
        401: userNotExists,
    },
};
