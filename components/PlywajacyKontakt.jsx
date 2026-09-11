"use client";

import { useEffect, useState } from "react";

export default function PlywajacyKontakt() {
  const [widoczny, setWidoczny] = useState(true);

  useEffect(() => {
    const karuzela = document.querySelector(".karuzela");
    if (!karuzela) return;

    const obserwator = new IntersectionObserver(
      ([wpis]) => setWidoczny(!wpis.isIntersecting),
      { threshold: 0.2 }
    );
    obserwator.observe(karuzela);

    return () => obserwator.disconnect();
  }, []);

  return (
    <a className="plywajacy-kontakt" href="/#kontakt" hidden={!widoczny}>
      Napisz do mnie
    </a>
  );
}
