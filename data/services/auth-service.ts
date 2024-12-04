import { getStrapiURL } from "@/lib/utils";

interface RegisterUserProps {
    username: string;
    password: string;
    email: string;
}

interface LoginUserProps {
    identifier: string;
    password: string;
}

type RegisterResponse = {
    jwt: string; // The JWT token from Strapi
    user: {
        id: number;
        username: string;
        email: string;
        credits?: number; // Optional if credits are part of the user model
    };
};

const baseUrl = getStrapiURL();

export async function registerUserService(userData: RegisterUserProps) {
    const url = new URL ("/api/auth/local/register", baseUrl);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({ 
                ...userData,
                credits: 1,
            }),
            cache: "no-cache",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to register user.");
        }

        return response.json();
    } catch (error) {
        console.error("Registration Service Error:", error);
        throw error;
    }
}

export async function loginUserService(userData: LoginUserProps) {
    const url = new URL("/api/auth/local", baseUrl);
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData }),
            cache: "no-cache",
        });
        return response.json();
    } catch (error) {
        console.error("login Service Error:", error);
        throw error;
    }
}