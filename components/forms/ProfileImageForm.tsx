"use client";

import { cn } from "@/lib/utils";
import ImagePicker from "../custom/ImagePicker";
import { ZodErrors } from "../custom/ZodErrors";
import { StrapiErrors } from "../custom/StrapiErrors";
import { uploadProfileImageAction } from "@/data/actions/profile-actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "../custom/SubmitButton";

interface ProfileImageFormProps {
    id: string;
    url: string;
    alternativeText: string;
}

const initialState = {
    message: null,
    data: null,
    strapiErrors: null,
    zodErrors: null,
};

export function ProfileImageForm({
    data,
    className,
}: {
    data: Readonly<ProfileImageFormProps>,
    className?: string,
}) {
    const uploadprofileImageWithIdAction = uploadProfileImageAction.bind(
        null,
        data?.id
    );

    const [formState, formAction] = useFormState(
        uploadprofileImageWithIdAction,
        initialState
    );

    return (
        <form className={cn("space-y-4", className)} action={formAction}>
            <div className="">
                <ImagePicker
                    id="image"
                    name="image"
                    label="Profile Image"
                    defaultValue={data?.url || ""}
                />
                <ZodErrors error={formState.zodErrors?.image} />
                <StrapiErrors error={formState.strapiErrors} />
            </div>
            <div className="flex justify-end">
                <SubmitButton text="UploadImage" loadingText="Saving Image" />
            </div>
        </form>
    )
}