"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";
import { Activity, MapPin, Navigation2 } from "lucide-react";

type LatLng = [number, number];

type VehicleData = {
  id: string;
  route: LatLng[];
  duration: number;
  size: number;
  isMain?: boolean;
  startOffset: number;
};

const vehicles: VehicleData[] = [
  {
    id: "main",
    duration: 52000,
    size: 52,
    isMain: true,
    startOffset: 12000,
    route: [
      [13.0348, 80.2385],
      [13.0388, 80.2352],
      [13.0434, 80.2315],
      [13.0482, 80.2279],
      [13.0534, 80.2244],
      [13.0588, 80.2212],
      [13.0645, 80.2183],
      [13.0707, 80.2155],
      [13.0768, 80.2128],
      [13.0826, 80.2104],
    ],
  },
  {
    id: "vehicle-2",
    duration: 62000,
    size: 42,
    startOffset: 26000,
    route: [
      [13.0308, 80.2296],
      [13.0352, 80.2326],
      [13.0407, 80.2361],
      [13.0472, 80.2391],
      [13.0548, 80.2399],
      [13.0624, 80.2364],
      [13.0687, 80.2314],
      [13.0742, 80.2257],
      [13.0786, 80.2195],
    ],
  },
  {
    id: "vehicle-3",
    duration: 68000,
    size: 42,
    startOffset: 39000,
    route: [
      [13.0842, 80.2074],
      [13.0792, 80.2108],
      [13.0734, 80.2148],
      [13.0671, 80.2188],
      [13.0603, 80.2227],
      [13.0534, 80.2269],
      [13.0462, 80.2312],
      [13.0394, 80.2355],
      [13.0334, 80.2402],
    ],
  },
];

function easeInOut(value: number) {
  return value < 0.5
    ? 2 * value * value
    : 1 - Math.pow(-2 * value + 2, 2) / 2;
}

function getDistance(a: LatLng, b: LatLng) {
  const lat = b[0] - a[0];
  const lng = b[1] - a[1];

  return Math.sqrt(lat * lat + lng * lng);
}

function getPointOnOpenRoute(route: LatLng[], progress: number): LatLng {
  const cleanProgress = Math.min(Math.max(progress, 0), 0.999);

  const segments = route.slice(0, -1).map((point, index) => {
    const next = route[index + 1];

    return {
      start: point,
      end: next,
      length: getDistance(point, next),
    };
  });

  const totalLength = segments.reduce((sum, item) => sum + item.length, 0);
  let travelled = cleanProgress * totalLength;

  for (const segment of segments) {
    if (travelled <= segment.length) {
      const localProgress = travelled / segment.length;
      const smoothProgress = easeInOut(localProgress);

      return [
        segment.start[0] +
          (segment.end[0] - segment.start[0]) * smoothProgress,
        segment.start[1] +
          (segment.end[1] - segment.start[1]) * smoothProgress,
      ];
    }

    travelled -= segment.length;
  }

  return route[route.length - 1];
}

function getStoredStartTime(vehicle: VehicleData) {
  const key = `adinn-gps-${vehicle.id}-start-time`;
  const savedValue = window.localStorage.getItem(key);

  if (savedValue) {
    const savedTime = Number(savedValue);

    if (Number.isFinite(savedTime)) {
      return savedTime;
    }
  }

  const startedAt = Date.now() - vehicle.startOffset;
  window.localStorage.setItem(key, String(startedAt));

  return startedAt;
}

function getForwardProgress(startedAt: number, duration: number) {
  const elapsed = Date.now() - startedAt;

  const cycle = Math.floor(elapsed / duration);
  const cycleProgress = (elapsed % duration) / duration;

  if (cycleProgress > 0.985) {
    const newStartedAt = Date.now();
    return {
      progress: 0.02,
      resetStartTime: newStartedAt,
    };
  }

  return {
    progress: cycleProgress,
    resetStartTime: null as number | null,
  };
}

function createVehicleIcon(vehicle: VehicleData) {
  return `
    <div class="${vehicle.isMain ? "adinn-map-vehicle is-main" : "adinn-map-vehicle"}" style="--vehicle-size:${vehicle.size}px;">
      ${vehicle.isMain ? '<span class="adinn-map-vehicle-live-ring"></span>' : ""}
      <img src="/assets/map-vehicle.png" alt="Vehicle" />
    </div>
  `;
}

function LiveTrackingMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any = null;
    let frameId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let destroyed = false;

    const markerData: {
      id: string;
      marker: any;
      vehicle: VehicleData;
      startedAt: number;
    }[] = [];

    async function initMap() {
      const L = await import("leaflet");

      if (destroyed || !mapRef.current) return;

      if (mapRef.current.clientWidth < 300 || mapRef.current.clientHeight < 300) {
        window.setTimeout(initMap, 200);
        return;
      }

      mapRef.current.innerHTML = "";

      map = L.map(mapRef.current, {
        center: [13.058, 80.225],
        zoom: 14,
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 20,
          subdomains: "abcd",
        }
      ).addTo(map);

      vehicles.forEach((vehicle) => {
        const icon = L.divIcon({
          className: "",
          html: createVehicleIcon(vehicle),
          iconSize: [vehicle.size, vehicle.size],
          iconAnchor: [vehicle.size / 2, vehicle.size / 2],
        });

        const startedAt = getStoredStartTime(vehicle);
        const { progress } = getForwardProgress(startedAt, vehicle.duration);

        const marker = L.marker(getPointOnOpenRoute(vehicle.route, progress), {
          icon,
          interactive: false,
          zIndexOffset: vehicle.isMain ? 1000 : 500,
        }).addTo(map);

        markerData.push({
          id: vehicle.id,
          marker,
          vehicle,
          startedAt,
        });
      });

      const allPoints = vehicles.flatMap((vehicle) => vehicle.route);
      const bounds = L.latLngBounds(allPoints);

      map.fitBounds(bounds, {
        padding: [85, 85],
      });

      const fixMapSize = () => {
        if (!map) return;
        map.invalidateSize(false);
      };

      window.setTimeout(fixMapSize, 100);
      window.setTimeout(fixMapSize, 400);
      window.setTimeout(fixMapSize, 900);
      window.setTimeout(fixMapSize, 1600);

      resizeObserver = new ResizeObserver(fixMapSize);
      resizeObserver.observe(mapRef.current);

      const moveVehicles = () => {
        if (destroyed) return;

        markerData.forEach((item) => {
          const { progress, resetStartTime } = getForwardProgress(
            item.startedAt,
            item.vehicle.duration
          );

          if (resetStartTime) {
            item.startedAt = resetStartTime;
            window.localStorage.setItem(
              `adinn-gps-${item.id}-start-time`,
              String(resetStartTime)
            );
          }

          const point = getPointOnOpenRoute(item.vehicle.route, progress);
          item.marker.setLatLng(point);
        });

        frameId = requestAnimationFrame(moveVehicles);
      };

      moveVehicles();
    }

    initMap();

    return () => {
      destroyed = true;
      cancelAnimationFrame(frameId);

      if (resizeObserver) {
        resizeObserver.disconnect();
      }

      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-black/[0.06] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
      <div className="relative h-[520px] w-full overflow-hidden rounded-t-[30px] bg-[#E8EFF6]">
        <div ref={mapRef} className="absolute inset-0 h-full w-full" />

        <div className="pointer-events-none absolute inset-0 z-[400] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0)_60%,rgba(255,255,255,0.08))]" />

        <div className="absolute left-5 top-5 z-[500] rounded-full bg-white/95 px-4 py-2 text-[12px] font-semibold text-[#111827] shadow-[0_12px_34px_rgba(15,23,42,0.14)] backdrop-blur-md">
          Live Map View
        </div>

        <div className="absolute right-5 top-5 z-[500] flex items-center gap-2 rounded-full bg-[#E3000F] px-4 py-2 text-[12px] font-semibold text-white shadow-[0_12px_34px_rgba(227,0,15,0.25)]">
          <span className="size-2 rounded-full bg-white animate-pulse" />
          GPS Updating
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.06] bg-white px-5 py-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="size-2 rounded-full bg-[#E3000F] animate-pulse" />
          <span className="text-[#667085]">Live</span>
          <span className="font-semibold text-[#111827]">
            Campaign #ADN-2410
          </span>
        </div>

        <div className="text-sm font-medium text-[#667085]">
          Chennai → T. Nagar → Anna Nagar → Velachery
        </div>
      </div>

      <style jsx global>{`
        .leaflet-container {
          height: 100% !important;
          width: 100% !important;
          background: #e8eff6 !important;
          font-family: inherit;
          z-index: 1;
        }

        .leaflet-container img,
        .leaflet-tile {
          max-width: none !important;
          max-height: none !important;
        }

        .leaflet-tile {
          filter: saturate(1.08) contrast(1.02) brightness(1.03);
        }

        .leaflet-control-container {
          position: relative;
          z-index: 600;
        }

        .leaflet-control-zoom {
          overflow: hidden;
          border: 0 !important;
          border-radius: 14px !important;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.16) !important;
        }

        .leaflet-control-zoom a {
          border: 0 !important;
          color: #111827 !important;
          background: #ffffff !important;
        }

        .adinn-map-vehicle {
          position: relative;
          display: grid;
          width: var(--vehicle-size);
          height: var(--vehicle-size);
          place-items: center;
        }

        .adinn-map-vehicle img {
          position: relative;
          z-index: 3;
          width: calc(var(--vehicle-size) - 8px) !important;
          height: calc(var(--vehicle-size) - 8px) !important;
          object-fit: contain;
          transform: rotate(0deg) !important;
          filter: drop-shadow(0 8px 12px rgba(15, 23, 42, 0.24));
        }

        .adinn-map-vehicle.is-main img {
          width: calc(var(--vehicle-size) - 5px) !important;
          height: calc(var(--vehicle-size) - 5px) !important;
        }

        .adinn-map-vehicle-live-ring {
          position: absolute;
          inset: 5px;
          z-index: 1;
          border-radius: 999px;
          background: rgba(227, 0, 15, 0.12);
          box-shadow: 0 0 0 6px rgba(227, 0, 15, 0.08);
        }

        .leaflet-marker-icon {
          transition: none !important;
          will-change: transform;
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
          <LiveTrackingMap />
        </div>
      </div>
    </section>
  );
}