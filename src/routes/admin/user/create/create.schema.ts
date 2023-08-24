import { userSchema } from "@helpers";
import z from "zod";

const body = z.object({
    login: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
});

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = userSchema
    .omit({ token: true, password: true })
    .describe("Модель пользователя");

export const schema = {
    description: "Создание пользователя администратором",
    tags: ["admin"],
    body,
    security: [{ bearerAuth: [] }],
    response: {
        200: response,
        401: userNotExists,
    },
};
