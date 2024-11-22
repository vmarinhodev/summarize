import { PaginationComponent } from "@/components/PaginationComponent";
import { Search } from "@/components/custom/Search";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSummaries } from "@/data/loaders";
import Link from "next/link";

interface LinkCardProps {
    id: string;
    title: string;
    summary: string;
}

function LinkCard({ id, title, summary }: Readonly<LinkCardProps>) {
    return (
        <Link href={`/dashboard/summaries/${id}`}>
            <Card className="relative">
                <CardHeader>
                    <CardTitle className="leading-8 text-pink-500">
                        {title || "Video Summary"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="w-full mb-4 leading-7">
                        {summary.slice(0, 164) + "[read more]"}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}

interface SearchParamsProps {
    searchParams?: {
        query?: string;
        page?: string;
    };
}

export default async function SummariesRoute({
    searchParams,
}: Readonly<SearchParamsProps>) {
    // this will give us the search params from the url taht will pass to our getsummaries function
    const query = searchParams?.query ?? "";
    const currentPage = Number(searchParams?.page) || 1;
    const { data, meta } = await getSummaries(query, currentPage);
    const pageCount = meta?.pagination.pageCount;

    if (!data) return null;
    return (
        <div className="grid grid-cols-1 gap-4 p-4">
            <Search />
            <span>Query: {query}</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.map((item: LinkCardProps) => (
                    <LinkCard key={item.id} {...item} />
                ))}
            </div>
            <PaginationComponent pageCount={pageCount} />
        </div>
    )
}