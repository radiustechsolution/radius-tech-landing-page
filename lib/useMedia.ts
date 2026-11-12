"use client";

import { useEffect, useState } from "react";

/** Full animated experience only on real desktops (wide screen + mouse) */
export const DESKTOP_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}
