"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

/** Mapa de verdade (OpenStreetMap, sem chave de API). A biblioteca só é baixada quando o mapa chega perto da tela. */
export default function Mapa({ lat, lng, rotulo }: { lat: number; lng: number; rotulo: string }) {
  const caixa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = caixa.current!;
    let mapa: import("leaflet").Map | undefined;
    let vivo = true;
    const olho = new IntersectionObserver(
      async ([e]) => {
        if (!e.isIntersecting) return;
        olho.disconnect();
        const L = (await import("leaflet")).default;
        if (!vivo) return;
        mapa = L.map(el, { center: [lat, lng], zoom: 16, scrollWheelZoom: false, attributionControl: true });
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(mapa);
        const pino = L.divIcon({
          className: "",
          iconSize: [34, 34],
          iconAnchor: [17, 17],
          html: '<span style="display:block;width:34px;height:34px;border-radius:50%;background:#FF4F8B;border:4px solid #18130F;box-shadow:inset 0 0 0 7px #FF4F8B, inset 0 0 0 14px #18130F"></span>',
        });
        L.marker([lat, lng], { icon: pino, alt: rotulo, keyboard: false }).addTo(mapa);
      },
      { rootMargin: "300px" },
    );
    olho.observe(el);
    return () => {
      vivo = false;
      olho.disconnect();
      mapa?.remove();
    };
  }, [lat, lng, rotulo]);

  return (
    <div
      ref={caixa}
      role="application"
      aria-label={`Mapa: ${rotulo}`}
      className="mapa frente h-[420px] w-full border-2 border-focinho bg-osso-2 lg:h-[560px]"
    />
  );
}
