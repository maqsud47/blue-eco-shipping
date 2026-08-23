import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Blu Eco Shipping & Logistics",
    short_name: "Blu Eco Shipping & Logistics",
    description:
      "Customs clearing & forwarding, freight and logistics in Bangladesh — efficient, transparent and eco-conscious trade solutions.",
    start_url: "/en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0e6d78",
    icons: [
      { src: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { src: "/icon.png", sizes: "96x96", type: "image/png" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
