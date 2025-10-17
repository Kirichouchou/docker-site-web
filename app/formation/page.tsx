// app/formation/page.tsx
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; // on veut lire les cookies à chaque requête

type ModuleItem = {
  id: string;
  title: string;
  type: "VIDEO" | "EBOOK";
  url: string;
  order: number;
};

type Training = {
  product: { id: string; key: string; name: string; amount: number };
  modules: ModuleItem[];
};

async function getMyTrainings() {
  // 1) Blocage si pas de cookie d’auth
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) redirect("/login");

  // 2) Construire une URL absolue depuis les en-têtes (host + protocole)
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  const base = `${proto}://${host}`;
  const url = new URL("/api/formation/my", base);

  // 3) Appeler l’API en forwardant explicitement les cookies
  const res = await fetch(url, {
    method: "GET",
    headers: {
      cookie: cookieStore.toString(), // <-- forward des cookies au route handler
    },
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 401) redirect("/login");
    throw new Error("Failed to load trainings");
  }

  const data = (await res.json()) as { ok: true; trainings: Training[] };
  return data.trainings;
}

export default async function FormationPage() {
  const trainings = await getMyTrainings();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Votre formation</h1>

      {trainings.length === 0 ? (
        <div className="rounded border p-6">
          <p className="mb-2">Vous n’avez pas encore d’accès actif.</p>
          <a href="/#produits" className="text-blue-600 underline">
            Voir les produits
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {trainings.map(({ product, modules }) => (
            <section key={product.id} className="space-y-3">
              <h2 className="text-xl font-medium">{product.name}</h2>

              {modules.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Modules non disponibles pour ce produit.
                </p>
              ) : (
                <ul className="space-y-3">
                  {modules.map((m) => (
                    <li key={m.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{m.title}</p>
                          <p className="text-xs text-gray-500">{m.type}</p>
                        </div>
                        <a
                          className="text-blue-600 underline"
                          href={m.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {m.type === "VIDEO"
                            ? "Ouvrir la vidéo"
                            : "Télécharger l’ebook"}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
