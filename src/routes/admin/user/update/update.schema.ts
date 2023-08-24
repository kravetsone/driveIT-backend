import { userSchema } from "@helpers";
import { UserRole } from "@prisma/client";
import z from "zod";

const body = z
    .object({
        id: z.number(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        password: z.string().optional(),
        role: z.nativeEnum(UserRole),
    })
    .describe("Данные для обновления");

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = userSchema
    .pick({ id: true, firstName: true, lastName: true })
    .describe("Модель обновлённого пользователя");

export const schema = {
    description: "Обновление пользователя администратором",
    tags: ["admin"],
    body,
    security: [{ bearerAuth: [] }],
    response: {
        200: response,
        401: userNotExists,
    },
};
