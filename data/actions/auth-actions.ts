"use server";
import { z } from "zod";
import { registerUserService } from "../services/auth-service";

const schemaRegister = z.object({
    username: z
        .string({ errorMap: () => ({ message: "Username must be between 5 and 10 characters" })})
        .min(3)
        .max(20),
    password: z
        .string({ errorMap: () => ({ message: "Password must be between 6 and 10 characters" })})
        .min(6)
        .max(100),
    email: z
        .string()
        .email({ message: "Please enter a valid email address" }),
  });


export async function registerUserAction(prevState: any, formData: FormData) {
    const validateFields = schemaRegister.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
        email: formData.get("email"),
    });

    if (!validateFields.success) {
        return {
            ...prevState,
            zodErrors: validateFields.error.flatten().fieldErrors,
            strapiErrors: null,
            message: "Missing Fields. Failed to Register.",
        };
    }

    const responseData = await registerUserService(validateFields.data);
    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            zodErrors: null,
            message: "Ops! Something went wrong. Please try again.",
        };
    }

    if (responseData) {
        return {
            ...prevState,
            strapiErrors: responseData,
            zodErrors: null,
            message: "Failed to Register.",
        }
    }

    console.log("user registered", responseData.jwt)
}