"use client";

import { Reveal } from "./Reveal";
import { Activity, MapPin, Navigation2 } from "lucide-react";
import { useEffect, useRef } from "react";

type LatLng = [number, number];

type Vehicle = {
  id: string;
  route: LatLng[];
  size: number;
  speed: number;
  offset: number;
  active?: boolean;
};

const VEHICLE_COUNT = 20;

/*
  Vehicle direction fixing:
  0   = use this if your vehicle image faces TOP
  -90 = use this if your vehicle image faces RIGHT
  90  = use this if your vehicle image faces LEFT
  180 = use this if your vehicle image faces BOTTOM
*/
const VEHICLE_IMAGE_ROTATION_OFFSET = 0;

/*
  Vehicle zoom behavior:
  Leaflet map zooms tiles automatically, but markers stay same size by default.
  This code manually scales vehicle icon size with map zoom.
*/
const MIN_VEHICLE_SCALE = 0.45;
const MAX_VEHICLE_SCALE = 4;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getVehicleScaleByZoom(map: any, baseZoom: number) {
  const zoomDifference = map.getZoom() - baseZoom;

  return clamp(
    Math.pow(2, zoomDifference),
    MIN_VEHICLE_SCALE,
    MAX_VEHICLE_SCALE
  );
}

const southIndiaBounds: LatLng[] = [
  [8.08, 76.9],
  [8.9, 78.1],
  [9.92, 78.12],
  [10.79, 78.7],
  [11.01, 76.96],
  [12.97, 77.59],
  [13.08, 80.27],
  [15.91, 79.74],
  [17.38, 78.48],
  [17.68, 83.21],
  [15.31, 75.71],
  [12.91, 74.85],
];

const routeTemplates: LatLng[][] = [
  [
    [13.0827, 80.2707],
    [12.9165, 79.1325],
    [12.6819, 78.6208],
    [12.9716, 77.5946],
    [13.6288, 79.4192],
    [13.0827, 80.2707],
  ],
  [
    [12.9716, 77.5946],
    [13.3392, 77.1135],
    [14.4426, 79.9865],
    [16.5062, 80.648],
    [17.385, 78.4867],
    [15.8281, 78.0373],
    [12.9716, 77.5946],
  ],
  [
    [13.0827, 80.2707],
    [12.2253, 79.0747],
    [11.6643, 78.146],
    [11.0168, 76.9558],
    [10.7905, 78.7047],
    [13.0827, 80.2707],
  ],
  [
    [11.0168, 76.9558],
    [10.5276, 76.2144],
    [9.9312, 76.2673],
    [9.4981, 76.3388],
    [8.5241, 76.9366],
    [9.9252, 78.1198],
    [11.0168, 76.9558],
  ],
  [
    [12.9141, 74.856],
    [13.3409, 74.7421],
    [15.3647, 75.124],
    [14.4644, 75.9218],
    [12.9716, 77.5946],
    [12.9141, 74.856],
  ],
  [
    [16.5062, 80.648],
    [17.0005, 81.804],
    [17.6868, 83.2185],
    [16.5062, 80.648],
    [15.5057, 80.0499],
    [13.0827, 80.2707],
    [16.5062, 80.648],
  ],
  [
    [9.9252, 78.1198],
    [10.7905, 78.7047],
    [11.6643, 78.146],
    [12.2253, 79.0747],
    [13.0827, 80.2707],
    [9.9252, 78.1198],
  ],
  [
    [17.385, 78.4867],
    [16.5062, 80.648],
    [14.4426, 79.9865],
    [13.6288, 79.4192],
    [12.9716, 77.5946],
    [17.385, 78.4867],
  ],
];

function seededRandom(seed: number) {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}

function randomBetween(seed: number, min: number, max: number) {
  return min + seededRandom(seed) * (max - min);
}

function distance(a: LatLng, b: LatLng) {
  const lat = b[0] - a[0];
  const lng = b[1] - a[1];

  return Math.sqrt(lat * lat + lng * lng);
}

function getBearing(from: LatLng, to: LatLng) {
  const lat1 = (from[0] * Math.PI) / 180;
  const lat2 = (to[0] * Math.PI) / 180;
  const lngDiff = ((to[1] - from[1]) * Math.PI) / 180;

  const y = Math.sin(lngDiff) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lngDiff);

  return (Math.atan2(y, x) * 180) / Math.PI;
}

function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

function smoothAngle(current: number, target: number) {
  const currentAngle = normalizeAngle(current);
  const targetAngle = normalizeAngle(target);

  let diff = targetAngle - currentAngle;

  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;

  return currentAngle + diff * 0.08;
}

function createVehicles(count: number): Vehicle[] {
  return Array.from({ length: count }).map((_, index) => {
    const baseRoute = routeTemplates[index % routeTemplates.length];

    const latOffset = randomBetween(index * 13.7, -0.035, 0.035);
    const lngOffset = randomBetween(index * 21.9, -0.045, 0.045);

    const route = baseRoute.map(
      ([lat, lng]) => [lat + latOffset, lng + lngOffset] as LatLng
    );

    return {
      id: `vehicle-${index + 1}`,
      route,
      size: index < 6 ? 34 : 28,
      speed: randomBetween(index * 8.8, 130000, 260000),
      offset: randomBetween(index * 14.3, 0, 240000),
      active: index < 6,
    };
  });
}

const vehicles = createVehicles(VEHICLE_COUNT);

function getPointOnRoute(route: LatLng[], progress: number) {
  const loopRoute = [...route, route[0]];
  const safeProgress = Math.min(Math.max(progress, 0), 0.999);

  const segments = loopRoute.slice(0, -1).map((point, index) => {
    const next = loopRoute[index + 1];

    return {
      start: point,
      end: next,
      length: distance(point, next),
    };
  });

  const totalLength = segments.reduce((sum, item) => sum + item.length, 0);
  let travelled = safeProgress * totalLength;

  for (const segment of segments) {
    if (travelled <= segment.length) {
      const localProgress = travelled / segment.length;

      const position: LatLng = [
        segment.start[0] + (segment.end[0] - segment.start[0]) * localProgress,
        segment.start[1] + (segment.end[1] - segment.start[1]) * localProgress,
      ];

      return {
        position,
        bearing: getBearing(segment.start, segment.end),
      };
    }

    travelled -= segment.length;
  }

  return {
    position: route[0],
    bearing: getBearing(route[0], route[1]),
  };
}

function createVehicleIcon(L: any, vehicle: Vehicle, scale = 1) {
  const scaledSize = Math.round(vehicle.size * scale);
  const activeExtraSize = vehicle.active ? Math.round(4 * scale) : 0;

  const visualSize = scaledSize + activeExtraSize;

  return L.divIcon({
    className: "",
    html: `
      <div
        class="${vehicle.active ? "south-live-vehicle active" : "south-live-vehicle"}"
        style="
          --vehicle-size:${scaledSize}px;
          --vehicle-active-extra:${activeExtraSize}px;
          --vehicle-live-scale:1;
        "
      >
        ${vehicle.active ? '<span class="south-live-ring"></span>' : ""}
        <img src="/assets/map-vehicle.png" alt="Vehicle" />
      </div>
    `,
    iconSize: [visualSize, visualSize],
    iconAnchor: [visualSize / 2, visualSize / 2],
  });
}

function SouthIndiaLiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any = null;
    let frameId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let destroyed = false;
    let baseZoom = 6;

    const markerItems: {
      marker: any;
      vehicle: Vehicle;
      angle: number;
      iconScale: number;
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
        center: [12.7, 78.6],
        zoom: 6,
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true,
        preferCanvas: true,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 20,
          subdomains: "abcd",
        }
      ).addTo(map);

      const bounds = L.latLngBounds(southIndiaBounds);

      map.fitBounds(bounds, {
        padding: [35, 35],
      });

      baseZoom = map.getZoom();

      vehicles.forEach((vehicle) => {
        const currentScale = getVehicleScaleByZoom(map, baseZoom);

        const icon = createVehicleIcon(L, vehicle, currentScale);

        const progress =
          ((Date.now() + vehicle.offset) % vehicle.speed) / vehicle.speed;

        const current = getPointOnRoute(vehicle.route, progress);

        const initialAngle =
          current.bearing + VEHICLE_IMAGE_ROTATION_OFFSET;

        const marker = L.marker(current.position, {
          icon,
          interactive: false,
          zIndexOffset: vehicle.active ? 1000 : 400,
        }).addTo(map);

        const markerElement = marker.getElement();

        if (markerElement) {
          markerElement.style.setProperty(
            "--vehicle-angle",
            `${initialAngle}deg`
          );
        }

        markerItems.push({
          marker,
          vehicle,
          angle: initialAngle,
          iconScale: currentScale,
        });
      });

      const applyVehicleLiveZoomScale = () => {
        if (!map) return;

        const liveScale = getVehicleScaleByZoom(map, baseZoom);

        markerItems.forEach((item) => {
          const markerElement = item.marker.getElement();

          if (markerElement) {
            const relativeScale = liveScale / item.iconScale;

            markerElement.style.setProperty(
              "--vehicle-live-scale",
              `${relativeScale}`
            );
          }
        });
      };

      const applyVehicleFinalZoomSize = () => {
        if (!map) return;

        const finalScale = getVehicleScaleByZoom(map, baseZoom);

        markerItems.forEach((item) => {
          item.iconScale = finalScale;

          item.marker.setIcon(createVehicleIcon(L, item.vehicle, finalScale));

          const markerElement = item.marker.getElement();

          if (markerElement) {
            markerElement.style.setProperty("--vehicle-live-scale", "1");
            markerElement.style.setProperty(
              "--vehicle-angle",
              `${item.angle}deg`
            );
          }
        });
      };

      map.on("zoom", applyVehicleLiveZoomScale);
      map.on("zoomend", applyVehicleFinalZoomSize);

      const fixMapSize = () => {
        if (!map) return;

        map.invalidateSize(false);
        applyVehicleFinalZoomSize();
      };

      window.setTimeout(fixMapSize, 100);
      window.setTimeout(fixMapSize, 500);
      window.setTimeout(fixMapSize, 1000);
      window.setTimeout(fixMapSize, 1800);

      resizeObserver = new ResizeObserver(fixMapSize);
      resizeObserver.observe(mapRef.current);

      const animate = () => {
        if (destroyed) return;

        const now = Date.now();

        markerItems.forEach((item) => {
          const progress =
            ((now + item.vehicle.offset) % item.vehicle.speed) /
            item.vehicle.speed;

          const current = getPointOnRoute(item.vehicle.route, progress);

          item.marker.setLatLng(current.position);

          const targetAngle =
            current.bearing + VEHICLE_IMAGE_ROTATION_OFFSET;

          item.angle = smoothAngle(item.angle, targetAngle);

          const markerElement = item.marker.getElement();

          if (markerElement) {
            markerElement.style.setProperty(
              "--vehicle-angle",
              `${item.angle}deg`
            );
          }
        });

        frameId = requestAnimationFrame(animate);
      };

      animate();
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
      <div className="relative h-[560px] w-full overflow-hidden rounded-t-[30px] bg-[#E8EFF6]">
        <div ref={mapRef} className="absolute inset-0 h-full w-full" />

        <div className="absolute right-5 top-5 z-[500] rounded-full bg-white/95 px-4 py-2 text-[12px] font-semibold text-[#111827] shadow-[0_12px_34px_rgba(15,23,42,0.14)] backdrop-blur-md">
          Live Fleet
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08] bg-white px-6 py-5">
        <div className="flex items-center gap-2 text-sm">
          <span className="size-2 rounded-full bg-[#111827]" />
          <span className="text-[#667085]">Live</span>
          <span className="font-semibold text-[#111827]">
            Campaign Fleet #ADN-SOUTH
          </span>
        </div>

        <div className="text-sm font-medium text-[#667085]">
          Tamil Nadu → Kerala → Karnataka → Andhra → Telangana
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

        .south-live-vehicle {
          position: relative;
          display: grid;
          width: var(--vehicle-size);
          height: var(--vehicle-size);
          place-items: center;
          pointer-events: none;
          transform: scale(var(--vehicle-live-scale, 1));
          transform-origin: center center;
          will-change: transform;
        }

        .south-live-vehicle img {
          position: relative;
          z-index: 3;
          width: var(--vehicle-size) !important;
          height: var(--vehicle-size) !important;
          object-fit: contain;
          transform: rotate(var(--vehicle-angle, 0deg)) !important;
          transform-origin: center center;
          filter: drop-shadow(0 5px 8px rgba(15, 23, 42, 0.22));
          will-change: transform;
        }

        .south-live-vehicle.active img {
          width: calc(var(--vehicle-size) + var(--vehicle-active-extra, 4px)) !important;
          height: calc(var(--vehicle-size) + var(--vehicle-active-extra, 4px)) !important;
        }

        .south-live-ring {
          position: absolute;
          inset: 4px;
          z-index: 1;
          border-radius: 999px;
          background: rgba(227, 0, 15, 0.1);
          box-shadow: 0 0 0 5px rgba(227, 0, 15, 0.07);
        }

        .leaflet-marker-icon {
          overflow: visible !important;
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
            <h2 className="mt-3 font-display text-[34px] font-semibold leading-[1.05] text-balance-tight md:text-[44px]">
              Track your campaign with confidence
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              GPS-supported tracking for route movement, live updates and execution proof.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <ul className="mt-8 space-y-4">
              {[
                {
                  i: Activity,
                  t: `${VEHICLE_COUNT} moving vehicles`,
                  d: "Fleet-style smooth movement across major South Indian cities.",
                },
                {
                  i: Navigation2,
                  t: "Forward movement",
                  d: "Vehicles turn gently based on direction, without side sliding.",
                },
                {
                  i: MapPin,
                  t: "Live map visibility",
                  d: "Zoom, drag and monitor vehicle movement in real time.",
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
            <button
              type="button"
              className="btn-primary mt-9"
              onClick={() => {
                const contactSection = document.getElementById("contact");

                if (contactSection) {
                  contactSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }

                window.history.replaceState(null, "", window.location.pathname);
              }}
            >
              Consult with Our Campaign Team
            </button>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <SouthIndiaLiveMap />
        </div>
      </div>
    </section>
  );
}