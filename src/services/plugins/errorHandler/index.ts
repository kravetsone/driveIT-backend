import { FastifyZodInstance } from "@types";
import fastifyPlugin from "fastify-plugin";

async function registerErrorHandler(fastify: FastifyZodInstance) {
    fastify.setErrorHandler((error, _req, res) => {
        if ("storageErrors" in error)
            return res.status(409).send({
                code: "UPLOAD_ERROR",
                message: error.message,
            });

        if ("errors" in error) {
            console.error(error.errors);
            return res.status(400).send({
                code: "VALIDATION_ERROR",
                message:
                    error.errors[0].message || "Произошла ошибка валидации",
                errors: error.errors.map((err) => ({
                    ...err,
                    path: err.path.join("."),
                })),
            });
        }
        console.error(error);
        return res.status(500).send({
            error: "SERVER_ERROR",
            message:
                "На сервере произошла техническая ошибка. Попробуйте позже",
        });
    });
}

export const errorHandlerPlugin = fastifyPlugin(registerErrorHandler, {
    name: "register-error-handler-plugin",
});
