import { z } from "zod";

const userSchema = z.object({
    id: z.string(),
    password: z.string()
        .max(20, {message: "Password cannot be more than 20 characters"}),
});

export const UserValidation = {
    userSchema
}

