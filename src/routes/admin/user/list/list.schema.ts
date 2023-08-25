import { userSchema } from "@helpers";
import z from "zod";

const querystring = z.object({
    page: z.string().transform(Number).refine(Boolean).default("1"),
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
            userSchema
                .pick({
                    id: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                })
                .merge(z.object({ login: z.string() })),
        ),
    })
    .describe("Список пользователй");

export const schema = {
    description: "Получение списка пользователей администратором",
    tags: ["admin"],
    security: [{ bearerAuth: [] }],
    querystring,
    response: {
        200: response,
        401: userNotExists,
    },
};
