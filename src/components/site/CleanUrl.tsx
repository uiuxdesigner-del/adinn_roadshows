"use client";

import { useEffect } from "react";

export function CleanUrl() {
  useEffect(() => {
    const cleanHash = () => {
      if (window.location.hash) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
    };

    cleanHash();
    window.addEventListener("hashchange", cleanHash);

    return () => {
      window.removeEventListener("hashchange", cleanHash);
    };
  }, []);

  return null;
}