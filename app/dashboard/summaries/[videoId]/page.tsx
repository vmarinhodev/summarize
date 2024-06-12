import { getSummaryById } from "@/data/loaders";
import { extractYouTubeID } from "@/lib/utils";
import { SummaryCardForm } from "@/components/forms/SummaryCardForm";

interface ParamsProps {
    params: {
        videoId: string;
    };
}

export default async function SummaryCardRoute({
    params,
}: Readonly<ParamsProps>) {
    const data = await getSummaryById(params.videoId);
    // if (data?.error?.status === 404) return <p>No Items found</p>;
    // const videoId = extractYouTubeID(data.videoId);
    return <SummaryCardForm item={data} />;
}