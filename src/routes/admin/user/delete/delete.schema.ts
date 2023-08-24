import z from "zod";

const params = z
    .object({
        userId: z.string().transform(Number).refine(Boolean),
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
    params,
    security: [{ bearerAuth: [] }],
    response: {
        200: response,
        401: userNotExists,
    },
};
