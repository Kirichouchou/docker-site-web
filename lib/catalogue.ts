// lib/catalogue.ts
export type ModuleItem = {
  id: string;
  title: string;
  type: "VIDEO" | "EBOOK";
  url: string;
  order: number;
};

// Keys should match Product.key in DB
export const catalogue: Record<string, ModuleItem[]> = {
  productA: [
    { id: "a1", title: "Introduction", type: "VIDEO", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", order: 1 },
    { id: "a2", title: "Fondamentaux", type: "VIDEO", url: "https://www.youtube.com/embed/9bZkp7q19f0", order: 2 },
    { id: "a3", title: "Ebook PDF", type: "EBOOK", url: "/files/ebook-produitA.pdf", order: 3 },
  ],
  productB: [
    { id: "b1", title: "Démarrage", type: "VIDEO", url: "https://player.vimeo.com/video/76979871", order: 1 },
    { id: "b2", title: "Guide (PDF)", type: "EBOOK", url: "/files/guide-produitB.pdf", order: 2 },
  ],
};

