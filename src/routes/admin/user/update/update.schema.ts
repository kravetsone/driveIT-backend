import { userSchema } from "@helpers";
import z from "zod";

const body = z
    .object({
        id: z.number(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        password: z.string().optional(),
    })
    .describe("Данные для обновления");

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = userSchema
    .pick({ firstName: true, lastName: true })
    .describe("Сообщение о том что пользователь успешно удалён");

export const schema = {
    description: "Удаление пользователя администратором",
    tags: ["admin"],
    body,
    security: [{ bearerAuth: [] }],
    response: {
        200: response,
        401: userNotExists,
    },
};
