import { config } from "@config";
import { Prisma, prisma } from "@db";
import bcrypt from "bcrypt";

export interface ISignInData {
    login: string;
    password: string;
}

export const userModelExtension = {
    model: {
        user: {
            async signUp(userData: Prisma.UserCreateInput) {
                return prisma.user.create({
                    data: {
                        ...userData,
                        password: bcrypt.hashSync(
                            userData.password,
                            config.saltRounds,
                        ),
                    },
                });
            },
            async signIn({ login, password }: ISignInData) {
                const user = await prisma.user.findFirst({
                    where: { login },
                });

                if (!user) return null;

                const match = await bcrypt.compare(password, user.password);

                if (!match) return null;

                return user;
            },
        },
    },
};
