import "@fastify/jwt";
import { User } from "@db";
import {
    FastifyBaseLogger,
    FastifyInstance,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
} from "fastify";
import { File } from "fastify-multer/lib/interfaces";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ZodError } from "zod";

export type FastifyZodInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    FastifyBaseLogger,
    ZodTypeProvider
>;

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: {
            id: number;
            password: string;
        };
        jwtUser: {
            id: number;
            password: string;
        };
    }
}
declare module "fastify" {
    interface PassportUser extends User { }

    interface FastifyInstance {
        auth: (
            getUser?: boolean,
        ) => (req: FastifyRequest, res: FastifyReply) => void;
    }
    interface FastifyRequest {
        user?: User | null;
        file?: File;
    }

    interface FastifyError extends ZodError { }
}

export type TRoute = (fastify: FastifyZodInstance) => unknown;

export enum GTFSFiles {
    AGENCY = "agency.txt",
}
