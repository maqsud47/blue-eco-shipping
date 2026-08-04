import {
  Ship,
  Container,
  Route,
  Warehouse,
  BadgeCheck,
  Handshake,
  Anchor,
  Plane,
  MapPin,
  Leaf,
  Network,
  Boxes,
  Headset,
  ShieldCheck,
  PackageCheck,
  Truck,
  TruckElectric,
  Fuel,
  type LucideIcon,
} from "lucide-react";

/**
 * Structured, locale-independent site data (proper nouns, contact details,
 * slugs, icons). Translatable copy lives in messages/{en,bn}.json.
 */

export const SITE = {
  name: "Blu Eco Shipping & Logistics",
  established: 2026,
} as const;

export const CONTACT = {
  // wa.me needs digits only.
  whatsapps: [{ display: "+880 1676-971355", number: "8801676971355" }],
  phones: [{ display: "+880 1676-971355", tel: "+8801676971355" }],
  email: "ceobeslbd@gmail.com",
} as const;

export const SOCIAL = {
  facebook: "#",
  linkedin: "#",
} as const;

export const NAV_LINKS = [
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "roadTransport", href: "/road-transportation" },
  { key: "contact", href: "/contact" },
] as const;

export type ServiceItem = {
  slug: string;
  key: string;
  icon: LucideIcon;
  image: string;
};
export const SERVICES: ServiceItem[] = [
  {
    slug: "customs-clearance",
    key: "customs",
    icon: BadgeCheck,
    image: "/photos/services/customs.jpg",
  },
  {
    slug: "freight-shipping",
    key: "freight",
    icon: Ship,
    image: "/photos/services/freight.jpg",
  },
  {
    slug: "specialized-cargo",
    key: "specialized",
    icon: Container,
    image: "/photos/services/specialized.jpg",
  },
  {
    slug: "logistics-solutions",
    key: "logistics",
    icon: Route,
    image: "/photos/truck1.jpg",
  },
  {
    slug: "trade-consultancy",
    key: "consultancy",
    icon: Handshake,
    image: "/photos/services/consultancy.jpg",
  },
  {
    slug: "warehouse-management",
    key: "warehouse",
    icon: Warehouse,
    image: "/photos/services/warehouse.jpg",
  },
];

export const GATEWAYS: { key: string; icon: LucideIcon; image: string }[] = [
  { key: "chittagong", icon: Anchor, image: "/photos/gateways/seaport.jpg" },
  { key: "dhaka", icon: Plane, image: "/photos/gateways/airport.jpg" },
  { key: "benapole", icon: MapPin, image: "/photos/gateways/benapole.png" },
  { key: "icd", icon: Container, image: "/photos/gateways/icd.jpg" },
  { key: "pangaon", icon: Ship, image: "/photos/gateways/pangaon.jpg" },
];

export const WHY: { key: string; icon: LucideIcon }[] = [
  { key: "sustainable", icon: Leaf },
  { key: "reach", icon: Network },
  { key: "endToEnd", icon: Boxes },
  { key: "responsive", icon: Headset },
  { key: "trusted", icon: ShieldCheck },
];

/**
 * Office address, stat values and fleet capacities are localized — the text
 * lives in messages/{en,bn}.json (`offices.*`, `home.stats.items.*`,
 * `roadTransportPage.fleet.*`). Only structure/keys live here.
 */

export const STAT_KEYS = ["since", "gateways", "services", "support"] as const;

export type Office = { key: string; phones: string[]; emails: string[] };
export const OFFICES: Office[] = [
  {
    key: "dhaka",
    phones: ["+880 1676-971355"],
    emails: ["ceobeslbd@gmail.com"],
  },
];

// Fleet, in the order given by the client.
export const FLEET: { key: string; icon: LucideIcon; image: string }[] = [
  { key: "pickup", icon: PackageCheck, image: "/photos/fleet/pickup.jpg" },
  { key: "truck", icon: Truck, image: "/photos/fleet/truck.jpg" },
  {
    key: "containerTruck",
    icon: Container,
    image: "/photos/fleet/container-truck.jpg",
  },
  { key: "trailer", icon: TruckElectric, image: "/photos/fleet/trailer.jpg" },
  { key: "lngTanker", icon: Fuel, image: "/photos/fleet/lng-tanker.jpg" },
];

/** tel: href from a display phone number. */
export function telHref(phone: string): string {
  return "tel:" + phone.replace(/[^\d+]/g, "");
}
