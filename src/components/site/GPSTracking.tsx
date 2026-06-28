"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";
import {
  MapPin,
  Activity,
  Navigation2,
} from "lucide-react";

const routePoints: [number, number][] = [
  [13.0392, 80.2337], // T. Nagar
  [13.0551, 80.2178],
  [13.0827, 80.2101], // Anna Nagar
  [13.0508, 80.2309],
  [12.9756, 80.2207], // Velachery
];

function getDistance(a: [number, number], b: [number, number]) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  return Math.sqrt(dx * dx + dy * dy);
}

function getPointOnRoute(progress: number) {
  const segments = routePoints.slice(0, -1).map((point, index) => {
    const next = routePoints[index + 1];
    return {
      start: point,
      end: next,
      length: getDistance(point, next),
    };
  });

  const totalLength = segments.reduce((sum, item) => sum + item.length, 0);
  let travelled = progress * totalLength;

  for (const segment of segments) {
    if (travelled <= segment.length) {
      const localProgress = travelled / segment.length;

      return [
        segment.start[0] + (segment.end[0] - segment.start[0]) * localProgress,
        segment.start[1] + (segment.end[1] - segment.start[1]) * localProgress,
      ] as [number, number];
    }

    travelled -= segment.length;
  }

  return routePoints[routePoints.length - 1];
}

function SatelliteMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any;
    let marker: any;
    let frameId = 0;

    async function initMap() {
      const L = await import("leaflet");

      if (!mapRef.current) return;

      map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false,
        doubleClickZoom: false,
      });

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 19,
        }
      ).addTo(map);

      const routeLine = L.polyline(routePoints, {
        color: "#E3000F",
        weight: 5,
        opacity: 0.95,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      L.polyline(routePoints, {
        color: "#ffffff",
        weight: 12,
        opacity: 0.18,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      const startIcon = L.divIcon({
        className: "",
        html: `
          <div class="gps-pin gps-pin-start">
            <span></span>
          </div>
        `,
        iconSize: [34, 42],
        iconAnchor: [17, 42],
      });

      const endIcon = L.divIcon({
        className: "",
        html: `
          <div class="gps-pin gps-pin-end">
            <span></span>
          </div>
        `,
        iconSize: [34, 42],
        iconAnchor: [17, 42],
      });

      L.marker(routePoints[0], { icon: startIcon }).addTo(map);
      L.marker(routePoints[routePoints.length - 1], { icon: endIcon }).addTo(map);

      const vehicleIcon = L.divIcon({
        className: "",
        html: `
          <div class="adinn-vehicle-marker">
            <div class="adinn-favicon-badge">
              <img src="/icon.svg" alt="A" />
            </div>

            <div class="adinn-vehicle-pulse"></div>

            <div class="adinn-vehicle-body">
              <div class="adinn-vehicle-screen"></div>
              <div class="adinn-vehicle-front"></div>
              <div class="adinn-vehicle-wheel adinn-vehicle-wheel-left"></div>
              <div class="adinn-vehicle-wheel adinn-vehicle-wheel-right"></div>
            </div>
          </div>
        `,
        iconSize: [72, 72],
        iconAnchor: [36, 52],
      });

      marker = L.marker(routePoints[0], {
        icon: vehicleIcon,
        interactive: false,
      }).addTo(map);

      map.fitBounds(routeLine.getBounds(), {
        padding: [42, 42],
      });

      const animate = (time: number) => {
        const duration = 11000;
        const progress = (time % duration) / duration;
        const point = getPointOnRoute(progress);

        if (marker) {
          marker.setLatLng(point);
        }

        frameId = requestAnimationFrame(animate);
      };

      frameId = requestAnimationFrame(animate);
    }

    initMap();

    return () => {
      cancelAnimationFrame(frameId);

      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-black/[0.06] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
      <div className="relative h-[420px] w-full overflow-hidden rounded-[30px] bg-[#111827]">
        <div ref={mapRef} className="h-full w-full" />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0)_32%,rgba(0,0,0,0.16))]" />

        <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-[12px] font-semibold text-[#111827] shadow-[0_12px_34px_rgba(0,0,0,0.16)] backdrop-blur-md">
          Live Satellite Tracking
        </div>

        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-[#E3000F] px-4 py-2 text-[12px] font-semibold text-white shadow-[0_12px_34px_rgba(227,0,15,0.28)]">
          <span className="size-2 rounded-full bg-white animate-pulse" />
          Vehicle Moving
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.06] bg-white px-5 py-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="size-2 rounded-full bg-[#E3000F] animate-pulse" />
          <span className="text-[#667085]">Live</span>
          <span className="font-semibold text-[#111827]">Campaign #ADN-2410</span>
        </div>

        <div className="text-sm font-medium text-[#667085]">
          Chennai → T. Nagar → Anna Nagar → Velachery
        </div>
      </div>

      <style jsx global>{`
        .leaflet-container {
          height: 100%;
          width: 100%;
          background: #111827;
          font-family: inherit;
        }

        .leaflet-tile {
          filter: saturate(1.08) contrast(1.05) brightness(0.88);
        }

        .gps-pin {
          position: relative;
          width: 34px;
          height: 42px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.25);
        }

        .gps-pin-start {
          background: #111827;
        }

        .gps-pin-end {
          background: #e3000f;
        }

        .gps-pin span {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #ffffff;
          transform: translate(-50%, -50%);
        }

        .adinn-vehicle-marker {
          position: relative;
          width: 72px;
          height: 72px;
        }

        .adinn-favicon-badge {
          position: absolute;
          left: 50%;
          top: -5px;
          z-index: 4;
          display: grid;
          width: 28px;
          height: 28px;
          place-items: center;
          overflow: hidden;
          border-radius: 999px;
          background: #ffffff;
          transform: translateX(-50%);
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.22);
        }

        .adinn-favicon-badge img {
          width: 18px;
          height: 18px;
          object-fit: contain;
        }

        .adinn-vehicle-pulse {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 58px;
          height: 58px;
          border-radius: 999px;
          background: rgba(227, 0, 15, 0.2);
          transform: translate(-50%, -50%);
          animation: adinnPulse 1.8s ease-in-out infinite;
        }

        .adinn-vehicle-body {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 3;
          width: 52px;
          height: 34px;
          border-radius: 10px 13px 10px 10px;
          background: #ffffff;
          transform: translate(-50%, -50%);
          box-shadow: 0 18px 42px rgba(0, 0, 0, 0.35);
        }

        .adinn-vehicle-screen {
          position: absolute;
          left: 7px;
          top: 7px;
          width: 25px;
          height: 15px;
          border-radius: 4px;
          background: linear-gradient(135deg, #e3000f, #8b0009);
        }

        .adinn-vehicle-front {
          position: absolute;
          right: 6px;
          top: 8px;
          width: 10px;
          height: 14px;
          border-radius: 3px;
          background: #111827;
        }

        .adinn-vehicle-wheel {
          position: absolute;
          bottom: -5px;
          width: 11px;
          height: 11px;
          border-radius: 999px;
          border: 2px solid #ffffff;
          background: #111827;
        }

        .adinn-vehicle-wheel-left {
          left: 9px;
        }

        .adinn-vehicle-wheel-right {
          right: 9px;
        }

        @keyframes adinnPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.9;
          }

          100% {
            transform: translate(-50%, -50%) scale(1.45);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export function GPSTracking() {
  return (
    <section className="section-pad">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="eyebrow">GPS Tracking</div>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="mt-3 font-display text-[34px] font-semibold leading-[1.05] text-balance-tight">
              Track your campaign with confidence
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              GPS-supported visibility for routes, movement, and live execution
              updates.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <ul className="mt-8 space-y-4">
              {[
                {
                  i: Activity,
                  t: "Real-time movement",
                  d: "Live vehicle position on the campaign route.",
                },
                {
                  i: Navigation2,
                  t: "Route adherence",
                  d: "Verify planned route execution.",
                },
                {
                  i: MapPin,
                  t: "Location reports",
                  d: "Periodic check-ins and end-of-day reports.",
                },
              ].map((f) => (
                <li key={f.t} className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E3000F]/10 text-[#E3000F]">
                    <f.i className="size-5" strokeWidth={1.4} />
                  </div>

                  <div>
                    <div className="font-medium">{f.t}</div>
                    <p className="text-sm text-muted-foreground">{f.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={4}>
            <a href="#contact" className="btn-primary mt-9">
              Talk to Our Campaign Team
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={2}>
            <SatelliteMap />
          </Reveal>
        </div>
      </div>
    </section>
  );
}