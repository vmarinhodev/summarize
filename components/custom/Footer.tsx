import Link from "next/link";
import { LinkedinIcon } from "lucide-react";
import { Logo } from "./Logo";

interface SocialLink {
    id: number;
    text: string;
    url: string;
}

interface FooterProps {
    data: {
        logoText: {
            id: number;
            text: string;
            url: string;
        }
        text: string,
        socialLink: SocialLink[],
    };
}

function selectSocialIcon(url: string) {
    if (url.includes("youtube")) return <YoutubeIcon className="h6 w-6" />;
    if (url.includes("twitter")) return <TwitterIcon className="h6 w-6" />;
    if (url.includes("linkedin")) return <LinkedinIcon className="h6 w-6" />;
}

export function Footer({ data }: Readonly<FooterProps>) {
    const { logoText, socialLink, text } = data;
    return (
        <div className="dark bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
                <Logo dark text={logoText.text} />
                <p className="mt-4 md:mt-0 text-sm text-gray-300">{text}</p>
                <div className="flex items-center space-x-4">
                    {socialLink.map((link) => {
                        return (
                            <Link key={link.id} className="text-white hover:text-gray-300" href={link.url}>
                                {selectSocialIcon(link.url)}
                                <span className="sr-only">Visit us at {link.text}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function YoutubeIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    );
  }

  function TwitterIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    );
  }