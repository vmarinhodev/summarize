"use server";
import { z } from "zod";
import { loginUserService, registerUserService } from "@/data/services/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
    maxAge: 60 * 60 * 24 * 7, // 1week
    path: "/",
    domain: process.env.HOST,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
}

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
    // console.log("Hello from Register User")
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

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            message: "Failed to Register.",
        };
    }

    // console.log('response', responseData.jwt)
    cookies().set("jwt", responseData.jwt, config);
    redirect("/dashboard");
}

const schemaLogin = z.object({
    identifier: z
        .string()
        .min(3, {
            message: "Identifier must have at least 3 or more characters",
        })
        .max(20, {
            message: "Please enter a valid username or email address",
        }),
    password: z
        .string()
        .min(6, {
            message: "Password must have at least 6 or more characters",
        })
        .max(10, {
            message: "Password must be between 6 and 10 characters",
        }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
    const validateFields = schemaLogin.safeParse({
        identifier: formData.get("identifier"),
        password: formData.get("password"),
    });

    if (!validateFields.success) {
        return {
            ...prevState,
            zodErrors: validateFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed Login.",
        };
    }

    const responseData = await loginUserService(validateFields.data);

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            message: "Ops! Something went wrong. Please try again."
        };
    }

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            message: "Failed to Login.",
        };
    }

    cookies().set("jwt", responseData.jwt);
    redirect("/dashboard"); 
}

export async function logoutAction() {
    cookies().set("jwt", "", { ...config, maxAge: 0});
    redirect("/");
}