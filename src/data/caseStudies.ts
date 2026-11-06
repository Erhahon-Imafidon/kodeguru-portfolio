// Client case studies. The full write-ups live in src/content/case-studies/<slug>.html
// (generated from the standalone case-study pages) and render at /work/<slug>.

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  headline: string;
  summary: string;
  results: string[];
  image: { src: string; alt: string; width: number; height: number };
  pdf: string;
  site?: { href: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cream",
    client: "CREAM",
    industry: "Entertainment and creator economy · Nigeria",
    headline: "Stopped weekly outages and kept more of every sale",
    summary:
      "A music and video platform losing customers to downtime and paying away most of each sale in fees. We rebuilt it to stay online, load fast on Nigerian mobile data, and take payment directly.",
    results: [
      "Outages down from 1 to 2 a week to none",
      "90% less mobile data to open a song page",
      "One login across four apps",
    ],
    image: {
      src: "/work/cream/creamplatform-desktop.jpg",
      alt: "CREAM platform home page",
      width: 1440,
      height: 900,
    },
    pdf: "/work/cream.pdf",
    site: { href: "https://creamplatform.com", label: "creamplatform.com" },
  },
  {
    slug: "kreditek",
    client: "Kreditek Cooperative",
    industry: "Cooperative finance · Nigeria",
    headline: "Put savings and loans online, and made them run on their own",
    summary:
      "A cooperative where members save monthly and borrow against their savings. We built the platform that signs members up, collects savings automatically and works out loans in seconds.",
    results: [
      "Savings collected automatically every day",
      "Loan limit worked out instantly, same rules for everyone",
      "Identity and bank details checked at sign-up",
    ],
    image: {
      src: "/work/kreditek/kredicoop-desktop.jpg",
      alt: "Kredicoop home page",
      width: 1440,
      height: 900,
    },
    pdf: "/work/kreditek.pdf",
    site: { href: "https://www.kredicoop.ng", label: "kredicoop.ng" },
  },
  {
    slug: "the-immigrant-stories",
    client: "The Immigrant Stories",
    industry: "Publishing · Digital book sales",
    headline: "Sold a digital book online without it being passed around",
    summary:
      "A platform for immigrants that wanted to sell its book through Stripe, with a private link only the buyer can use. No plugin did that, so we built one and refined it over five rounds.",
    results: [
      "Private link emailed the moment Stripe confirms payment",
      "Works on the buyer's own two devices only",
      "Dashboard of every buyer and who has opened it",
    ],
    image: {
      src: "/work/the-immigrant-stories/home-desktop.jpg",
      alt: "The Immigrant Stories home page",
      width: 1440,
      height: 900,
    },
    pdf: "/work/the-immigrant-stories.pdf",
    site: { href: "https://theimmigrantstories.com", label: "theimmigrantstories.com" },
  },
];
