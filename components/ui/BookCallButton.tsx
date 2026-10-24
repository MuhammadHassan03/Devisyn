import { BOOKING_URL, site } from "@/content/site";
import { Button } from "./Button";

interface Props {
  className?: string;
}

/** Secondary action next to the free check. Renders nothing until NEXT_PUBLIC_BOOKING_URL is set. */
export function BookCallButton({ className }: Props) {
  if (!BOOKING_URL) return null;

  return (
    <Button href={BOOKING_URL} variant="secondary" size="lg" className={className} target="_blank" rel="noopener noreferrer">
      {site.hero.bookCall}
    </Button>
  );
}
