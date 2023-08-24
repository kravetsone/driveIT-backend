import { userSchema } from "@helpers";
import z from "zod";

const body = z
    .object({
        id: z.number(),
    })
    .describe("Айди пользователя");

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z
    .object({
        message: z.string(),
    })
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
