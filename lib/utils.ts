import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function flattenAttributes(data: any): any {
  //Check if data is a plain object; return as is if not
  if (
    typeof data !== "object" ||
    data === null ||
    data instanceof Date ||
    typeof data === "function"
  ) {
    return data;
  }

  // If data is an array, apply flattenAttributes to each element and return as array
  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item));
  }

  // Initialize an object with an index signature for the flattened structure
  let flattened: { [key: string]: any } = {};

  // Iterate over each key in the object
  for (let key in data) {
    // Skip inherited properties from the prototype chain
    if (!data.hasOwnProperty(key)) continue;

    // If the key is 'attributes' or 'data', and its value is an object, merge their content
    if (
      (key === "attributes" || key === "data") &&
      typeof data[key] === "object" &&
      !Array.isArray(data[key])
    ) {
      Object.assign(flattened, flattenAttributes(data[key]));
    } else {
      // For other Keys, copy the value, applying flattenAttributes if it's an object
      flattened[key] = flattenAttributes(data[key])
    }
  }

  return flattened;
}

export function getStrapiURL() {
  return process.env.STRAPI_URL ?? "http://localhost:1337";
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}

export function extractYouTubeID(urlOrID: string): string | null {
  // Regular expression for youtube ID format
  const regExpID = /^[a-zA-Z0-9_-]{11}$/;

  // Check if the input is a youtube ID
  if (regExpID.test(urlOrID)) {
      return urlOrID;
  }
  
  // Regular expression for standard youtube links
  const regExpStandard =
  /(?:youtube\.com\/(?:watch\?v=|v\/)|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/;

  // Regular expression for YouTube Shorts links
const regExpShorts = /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;

  // Check for standard youtube link
  const matchStandard = urlOrID.match(regExpStandard);

  if (matchStandard) {
      return matchStandard[1];
  }

  // check for youtube Shorts link
  const matchShorts = urlOrID.match(regExpShorts);
  if (matchShorts) {
    return matchShorts[1];
  }

  // Return null if no match is found
  return null;
}