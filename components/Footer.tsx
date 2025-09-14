export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8 text-sm text-black/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} [NOM_MARQUE]. Tous droits réservés.</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:opacity-80">Mentions légales</a>
          <a href="/contact" className="hover:opacity-80">Support</a>
        </div>
      </div>
    </footer>
  );
}

