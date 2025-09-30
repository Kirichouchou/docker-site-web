"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContactOverlay } from "../../components/ContactOverlayProvider";

export default function ContactOverlayRedirect() {
  const { open } = useContactOverlay();
  const router = useRouter();

  useEffect(() => {
    open();
    router.replace("/", { scroll: false });
  }, [open, router]);

  return null;
}