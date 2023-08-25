import z from "zod";

const querystring = z.object({
    query: z.string().default(""),
    page: z.string().transform(Number).refine(Boolean).default("0"),
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
                id: z.number(),
                name: z.string(),
            }),
        ),
    })
    .describe("Список кораблеков");

export const schema = {
    description: "Получение списка кораблей",
    tags: ["ship"],
    security: [{ bearerAuth: [] }],
    querystring,
    response: {
        200: response,
        401: userNotExists,
    },
};
