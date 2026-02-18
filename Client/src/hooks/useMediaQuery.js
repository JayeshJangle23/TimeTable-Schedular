import { useEffect, useState } from "react";
export default function useMediaQuery(q) {
  const [m, setM] = useState(() => matchMedia(q).matches);
  useEffect(() => {
    const mm = matchMedia(q);
    const on = () => setM(mm.matches);
    mm.addEventListener?.("change", on);
    return () => mm.removeEventListener?.("change", on);
  }, [q]);
  return m;
}
