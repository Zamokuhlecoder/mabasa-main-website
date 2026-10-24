import { unsplash } from "./site";

export type Industry = {
  slug: string;
  name: string;
  image: string;
  alt: string;
  summary: string;
  challenges: string[];
  solutions: string[];
};

export const industries: Industry[] = [
  {
    slug: "financial-services",
    name: "Financial Services",
    image: unsplash("photo-1554469384-e58fac16e23a"),
    alt: "Looking up at a modern high-rise office building",
    summary:
      "Secure, auditable systems for organisations where accuracy, compliance and data protection are non-negotiable.",
    challenges: [
      "Manual onboarding and document verification",
      "Reconciliation across multiple systems and statements",
      "Regulatory reporting assembled by hand",
      "Strict requirements for access control and audit trails",
    ],
    solutions: [
      "Client onboarding portals with document capture and workflow",
      "Automated reconciliation and exception reporting",
      "Data pipelines feeding consistent management and regulatory reports",
      "Role-based internal platforms with full activity logging",
    ],
  },
  {
    slug: "logistics-and-supply-chain",
    name: "Logistics & Supply Chain",
    image: unsplash("photo-1553413077-190dd305871c"),
    alt: "Interior of a large warehouse with stacked shelving",
    summary:
      "Visibility and coordination across orders, inventory, fleets and partners, so operations run on current information.",
    challenges: [
      "Limited real-time visibility of stock and shipments",
      "Order data re-captured between client, warehouse and carrier systems",
      "Paper-based proof of delivery and manual exception handling",
      "Planning decisions made without reliable historical data",
    ],
    solutions: [
      "Integrations between order, warehouse and carrier platforms",
      "Tracking dashboards and automated exception alerts",
      "Mobile capture for deliveries, inspections and returns",
      "Demand and capacity reporting built on clean operational data",
    ],
  },
  {
    slug: "retail-and-ecommerce",
    name: "Retail & E-commerce",
    image: unsplash("photo-1441986300917-64674bd600d8"),
    alt: "Interior of a modern clothing store with garments on display",
    summary: "Connected commerce systems that keep products, stock, orders and customers aligned across every channel.",
    challenges: [
      "Stock levels out of sync between store, warehouse and online",
      "Manual product data management across channels",
      "Fragmented customer and sales data",
      "Platform limitations as order volumes grow",
    ],
    solutions: [
      "E-commerce, ERP and point-of-sale integration",
      "Product information and catalogue automation",
      "Unified sales and customer reporting",
      "Custom storefront features and scalable hosting",
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    image: unsplash("photo-1629410484397-a4dcd74088a0"),
    alt: "A bright, clean clinical corridor",
    summary:
      "Practical systems for administration, scheduling and information management, designed around privacy obligations.",
    challenges: [
      "Administrative workload in scheduling, billing and records",
      "Patient information held in disconnected systems",
      "Strict obligations for handling personal and health information",
      "Paper forms and manual data capture",
    ],
    solutions: [
      "Booking, intake and administration platforms",
      "Secure integrations between practice and billing systems",
      "Digital forms with validation and controlled access",
      "Operational reporting with appropriate data minimisation",
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    image: unsplash("photo-1568992687947-868a62a9f521"),
    alt: "A team meeting around a table in a modern office",
    summary: "Tools that reduce administrative overhead so specialists spend more time on client work.",
    challenges: [
      "Time-consuming document preparation and review",
      "Client information spread across email and shared drives",
      "Manual time, billing and project tracking",
      "Difficulty finding prior work and internal knowledge",
    ],
    solutions: [
      "Client portals for secure document exchange",
      "Document automation and AI-assisted drafting and review",
      "Practice management integrations and reporting",
      "Searchable internal knowledge systems",
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    image: unsplash("photo-1647427060118-4911c9821b82"),
    alt: "Industrial machinery on a factory floor",
    summary: "Better information from the production floor to the boardroom, connecting operational systems and data.",
    challenges: [
      "Production data captured on paper or isolated spreadsheets",
      "Limited visibility of output, downtime and quality",
      "ERP and shop-floor systems that do not communicate",
      "Maintenance driven by breakdowns rather than data",
    ],
    solutions: [
      "Digital production and quality capture applications",
      "Operational dashboards for output, downtime and yield",
      "ERP and equipment data integration",
      "Data foundations for maintenance and quality analysis",
    ],
  },
];
