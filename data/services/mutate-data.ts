import { getStrapiURL } from "@/lib/utils";
import { getAuthToken } from "./get-token";

export async function mutateData(method: string, path: string, payload?: any) {
    const baseUrl = getStrapiURL();
    const authToken = await getAuthToken();
    const url = new URL(path, baseUrl);

    if (!authToken) throw new Error("No such token found.");

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({...payload}),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error", error);
        throw error;
    }
}