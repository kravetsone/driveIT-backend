import { HOST } from "@config";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { FastifyZodInstance } from "@types";
import fastifyPlugin from "fastify-plugin";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { SwaggerTheme } from "swagger-themes";
import { z } from "zod";

const darkTheme = new SwaggerTheme("v3").getBuffer("dark");

export async function registerSwagger(fastify: FastifyZodInstance) {
    await fastify.register(fastifySwagger, {
        openapi: {
            info: {
                title: "DriveIT backend",
                version: "1.0",
            },
            servers: [
                {
                    url: "https://" + HOST,
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        name: "Authorization",
                        in: "header",
                        type: "apiKey",
                        description:
                            "JWT Authorization header (don't forget Bearer)",
                    },
                },
            },
        },
        transform: ({ schema, url }) => {
            if (/upload/i.test(url)) return { schema, url };

            if (schema?.response) {
                schema.response[400] = z
                    .object({
                        code: z.string().default("VALIDATION_ERROR"),
                        message: z
                            .string()
                            .default("Произошла ошибка валидации"),
                        errors: z.array(
                            z.object({
                                code: z.string(),
                                message: z.string(),
                                path: z.string(),
                            }),
                        ),
                    })
                    .describe("Ошибка валидации");

                schema.response[500] = z
                    .object({
                        code: z.string().default("SERVER_ERROR"),
                        message: z
                            .string()
                            .default(
                                "На сервере произошла техническая ошибка. Попробуйте позже",
                            ),
                    })
                    .describe("Ошибка сервера. Что-то пошло не так");
            }

            return jsonSchemaTransform({ schema, url });
        },
    });

    await fastify.register(fastifySwaggerUI, {
        routePrefix: "/documentation",
        uiConfig: {
            docExpansion: "list",
            deepLinking: false,
            syntaxHighlight: {
                activate: true,
                theme: "monokai",
            },
            persistAuthorization: true,
        },
        theme: {
            css: [{ filename: "theme.css", content: darkTheme }],
        },
    });
}

export const swaggerPlugin = fastifyPlugin(registerSwagger, {
    name: "swagger-import-plugin",
});
