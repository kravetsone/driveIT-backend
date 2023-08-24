import { UserRole } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    token: z.string(),
    role: z.nativeEnum(UserRole),
});
