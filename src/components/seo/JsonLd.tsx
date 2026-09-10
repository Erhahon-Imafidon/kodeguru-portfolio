import { projects } from "@/data/projects";
import { roles } from "@/data/roles";
import { site } from "@/data/site";

const personId = `${site.url}/#person`;

const person = {
  "@type": "Person",
  "@id": personId,
  name: site.name,
  jobTitle: "Software Engineer",
  description:
    "Software engineer building web and mobile products for fintech and media companies in Nigeria, plus business automation.",
  url: site.url,
  image: `${site.url}/opengraph-image.png`,
  email: `mailto:${site.email}`,
  telephone: site.phoneHref.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abuja",
    addressCountry: "NG",
  },
  sameAs: [site.github, site.linkedin],
  worksFor: { "@type": "Organization", name: site.company },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Delta State University, Abraka",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Fintech",
    "Payments integration",
    "OIDC and OAuth 2.0",
    "Identity verification (KYC)",
    "Business automation",
    "n8n",
    "GoHighLevel",
    "Web accessibility",
  ],
  hasOccupation: roles.map((r) => ({
    "@type": "Occupation",
    name: r.title.split(" — ")[0],
    description: r.title,
  })),
};

const website = {
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: `${site.name} — Software Engineer`,
  inLanguage: "en",
  author: { "@id": personId },
};

const work = {
  "@type": "ItemList",
  "@id": `${site.url}/#work`,
  name: "Selected work",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: projects.length,
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: p.title,
      description: p.summary,
      ...(p.href ? { url: p.href } : {}),
      author: { "@id": personId },
      keywords: p.stack.join(", "),
    },
  })),
};

const graph = { "@context": "https://schema.org", "@graph": [person, website, work] };

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
