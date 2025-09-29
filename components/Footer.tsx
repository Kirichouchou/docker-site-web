export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-[#F2F5FC]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-black/60 md:flex-row">
        <div>© {new Date().getFullYear()} Fynora. Tous droits réservés.</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:opacity-80">
            Mentions légales
          </a>
          <a href="/contact" className="hover:opacity-80">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
