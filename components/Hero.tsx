import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="rounded-2xl overflow-hidden shadow-md border border-border">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Présentation formation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">La formation qui accélère votre progression</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Un parcours clair, des résultats concrets. Accédez aux modules et au support dès aujourd’hui.
          </p>
          <a href="#produits" className="inline-flex items-center rounded-2xl px-6 py-3 bg-brand text-white hover:opacity-90 transition-all duration-200 shadow-soft text-base">
            Commencer maintenant <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
