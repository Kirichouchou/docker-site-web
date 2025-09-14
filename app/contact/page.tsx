export const metadata = { title: "Contact" };

import { Suspense } from "react";
import ContactPageClient from "./ContactPageClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ContactPageClient />
    </Suspense>
  );
}

