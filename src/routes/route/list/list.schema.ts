import z from "zod";

const querystring = z.object({
    query: z.string().default(""),
    page: z.string().transform(Number).refine(Boolean),
    pageSize: z.string().transform(Number).refine(Boolean),
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
                id: z.number(),
                shortName: z.string(),
                longName: z.string(),
            }),
        ),
    })
    .describe("Список маршрутов");
export const schema = {
    description: "Получение списка маршурутов",
    tags: ["route"],
    security: [{ bearerAuth: [] }],
    querystring,
    response: {
        200: response,
        401: userNotExists,
    },
};
