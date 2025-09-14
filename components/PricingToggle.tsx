"use client";

type Props = {
  value: "monthly" | "yearly";
  onChange: (v: "monthly" | "yearly") => void;
};

export default function PricingToggle({ value, onChange }: Props) {
  return (
    <div role="tablist" aria-label="Sélection facturation" className="inline-flex rounded-lg border border-border overflow-hidden">
      <button
        role="tab"
        aria-selected={value === "monthly"}
        className={`px-4 py-2 text-sm font-semibold ${value === "monthly" ? "bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))]" : "bg-white"}`}
        onClick={() => onChange("monthly")}
        data-event="pricing_toggle"
        data-value="monthly"
      >
        Mensuel
      </button>
      <button
        role="tab"
        aria-selected={value === "yearly"}
        className={`px-4 py-2 text-sm font-semibold ${value === "yearly" ? "bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))]" : "bg-white"}`}
        onClick={() => onChange("yearly")}
        data-event="pricing_toggle"
        data-value="yearly"
      >
        Annuel -2 mois
      </button>
    </div>
  );
}

