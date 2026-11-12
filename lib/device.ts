/** True on phones, tablets and low-power devices: used to run a lighter version of heavy effects */
export function isLowPower(): boolean {
  if (typeof window === "undefined") return false;

  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const smallScreen = window.innerWidth < 768;
  const fewCores = (navigator.hardwareConcurrency ?? 8) <= 4;
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData === true;

  return coarsePointer || smallScreen || fewCores || saveData;
}
