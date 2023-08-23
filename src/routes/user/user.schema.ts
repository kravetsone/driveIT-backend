import { userSchema } from "@helpers";
import z from "zod";

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = userSchema.describe("Модель пользователя");

export const schema = {
    description: "Авторизация в системе",
    tags: ["user"],
    response: {
        200: response,
        401: userNotExists,
    },
};
