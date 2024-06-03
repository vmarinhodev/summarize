import Link from "next/link";

export default function NotFoundRoot() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 ">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                    The page you looking for does not exist
                </h1>
                    <Link
                        href="/"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-gray-950 disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                        Back home
                    </Link>
            </div>
        </div>
    )
}