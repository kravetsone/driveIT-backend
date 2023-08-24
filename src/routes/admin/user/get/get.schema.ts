import { userSchema } from "@helpers";
import z from "zod";

const params = z.object({
    userId: z.string().transform(Number).refine(Boolean),
});

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = userSchema
    .omit({ token: true })
    .describe("Модель пользователя");

export const schema = {
    description: "Получение пользователя",
    tags: ["admin"],
    params,
    security: [{ bearerAuth: [] }],
    response: {
        200: response,
        401: userNotExists,
    },
};
