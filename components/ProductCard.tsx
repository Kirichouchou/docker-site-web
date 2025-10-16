"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function formatEUR(cents: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

export default function ProductCard(props: {
  product: {
    key: "productA" | "productB";
    name: string;
    priceCents: number;
    originalPriceCents?: number;
    bullets: string[];
    tag?: string;
    image: { src: string; alt: string; width: number; height: number };
  };
}) {
  const { product } = props;

  return (
    <Card className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group">
      {product.tag && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {product.tag}
          </span>
        </div>
      )}
      
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <CardTitle className="text-xl font-bold mb-4 text-gray-900">
          {product.name}
        </CardTitle>
        
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">
              {formatEUR(product.priceCents)}
            </span>
            {product.originalPriceCents && (
              <span className="text-lg text-gray-500 line-through">
                {formatEUR(product.originalPriceCents)}
              </span>
            )}
          </div>
        </div>
        
        <ul className="space-y-3 mb-6">
          {product.bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700">{bullet}</span>
            </li>
          ))}
        </ul>
        
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Contactez-nous pour plus d'informations
          </p>
        </div>
      </CardContent>
    </Card>
  );
}