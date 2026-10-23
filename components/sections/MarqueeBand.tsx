import { site } from "@/content/site";
import { Marquee } from "@/components/ui/Marquee";
import styles from "./MarqueeBand.module.css";

export function MarqueeBand() {
  const { marquee } = site;

  return (
    <div className={`marquee-band ${styles.band}`}>
      <p className="sr-only">{marquee.label}</p>
      <Marquee items={marquee.top} variant="display" separator={() => "✦"} />
      <Marquee items={marquee.bottom} variant="serif" reverse separator={() => "·"} />
    </div>
  );
}
