"use client";

import { useActionState } from "react";
import { StrapiErrors } from "../custom/StrapiErrors";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { SubmitButton } from "../custom/SubmitButton";
import { DeleteButton } from "../custom/DeleteButton";
import { deleteSummaryAction, updateSummaryAction } from "@/data/actions/summary-actions";

const INITIAL_STATE = {
    strapiErrors: null,
    data: null,
    message: null,
};

export function SummaryCardForm({
    item,
    className,
}: {
    readonly item: any;
    readonly className?: string;
}) {
    const deleteSummaryById = deleteSummaryAction.bind(null, item.id);

    const [deleteState, deleteAction] = useActionState(
        deleteSummaryById,
        INITIAL_STATE
    );

    const [updateState, updateAction] = useActionState(
        updateSummaryAction,
        INITIAL_STATE
    );

    return (
        <Card className={cn("mb-8 relative h-auto", className)}>
            <CardHeader>
                <CardTitle>Video Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <>
                    <form action={updateAction}>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Update your title"
                            required
                            className="mb-4"
                            defaultValue={item.title}
                        />
                        <Textarea
                            name="summary"
                            className="flex w-full rounded-md bg-transparent px-3 py-2 text-sm shadow-sm placeholder: text-muted-foreground focus-visible:outline-none focus-visible:bg-gray-50 focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mb-4 h-[calc(100vh-245px)] "
                            defaultValue={item.summary}
                        />
                        <input type="hidden" name="id" value={item.id} />
                        <SubmitButton
                            text="Update Summary"
                            loadingText="Updating Summary"
                        />
                    </form>
                    <form action={deleteAction}>
                        <DeleteButton className="absolute right-4 top-4 bg-red-700 hover:bg-red-600" />
                    </form>
                </>
            </CardContent>
            <CardFooter>
                <StrapiErrors
                    error={deleteState?.strapiErrors || updateState?.strapiErrors}
                />
            </CardFooter>
        </Card>
    );
}