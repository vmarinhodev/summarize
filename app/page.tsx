import qs from "qs";
import { flattenAttributes } from "@/lib/utils";
import { HeroSection } from "@/components/custom/HeroSection";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        link: {
          populate: true,
        },
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.log(error)
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  // console.dir(strapiData, { depth: null });

  const { blocks } = await strapiData;
  return (
    <main>
      <HeroSection data={blocks[0]} />
    </main>
  );
}
