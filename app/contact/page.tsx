export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="section">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-extrabold tracking-tight">Nous contacter</h1>
        <p className="mt-2 text-black/70">Expliquez votre contexte, vos objectifs et vos délais. Nous revenons sous 24h.</p>

        <form className="mt-6 space-y-4" action="mailto:contact@example.com" method="post">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold">Nom</label>
            <input id="name" name="name" required className="mt-1 w-full rounded-lg border border-border px-3 py-2" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold">Email</label>
            <input id="email" type="email" name="email" required className="mt-1 w-full rounded-lg border border-border px-3 py-2" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold">Message</label>
            <textarea id="message" name="message" rows={5} required className="mt-1 w-full rounded-lg border border-border px-3 py-2" />
          </div>
          <button type="submit" className="inline-flex items-center rounded-lg px-6 py-3 min-h-12 bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] font-semibold">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

