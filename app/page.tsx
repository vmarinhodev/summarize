import qs from "qs";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import { HeroSection } from "@/components/custom/HeroSection";
import { FeatureSection } from "@/components/custom/FeaturesSection";

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
        feature: {
          populate: true,
        }
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = getStrapiURL();

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href, { cache: 'no-store' });
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.log(error)
  }
}

function blockRenderer(block: any) {
  switch (block.__component) {
    case "layout.hero-section" :
      return <HeroSection key={block.id} data={block} />
    case "layout.features-section":
      return <FeatureSection key={block.id} data={block} />
    default:
      return null;
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  const { blocks } = strapiData;
  if (!blocks) return <p>No sections found</p>
  // console.dir(blocks, { depth: null });
  return (
    <main>{blocks.map(blockRenderer)}</main>
  );
}
