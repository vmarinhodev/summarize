"use client";
import Link from "next/link";
import { useActionState } from "react";
import { loginUserAction } from "@/data/actions/auth-actions";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";
import { ZodErrors } from "../custom/ZodErrors";
import { SubmitButton } from "../custom/SubmitButton";
import { StrapiErrors } from "../custom/StrapiErrors";

const INITIAL_STATE = {
    zodErrors: null,
    strapiErrors: null,
    data: null,
    message: null,
};

export function LoginForm() {
    const [formState, formAction] = useActionState(loginUserAction, INITIAL_STATE);
    return (
        <div className="w-full max-w-md">
            <form action={formAction}>
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold">Login</CardTitle>
                        <CardDescription>
                            Enter your detail to Login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="identifier"
                                name="identifier"
                                type="text"
                                placeholder="username or email"
                            />
                            <ZodErrors error={formState?.zodErrors?.identifier} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="password"
                            />
                            <ZodErrors error={formState?.zodErrors?.password} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <SubmitButton
                            className="w-full"
                            text="Login"
                            loadingText="Loading"
                        />
                        <StrapiErrors error={formState?.strapiErrors?.error} />
                    </CardFooter>
                </Card>
                <div className="mt-4 text-center text-sm">
                        Don&rsquo;t have an account?
                    <Link className="underline ml-2" href="signup">
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
}