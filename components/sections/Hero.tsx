import type { ReactNode } from "react";
import { site } from "@/content/site";
import { seq } from "@/lib/motion";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Parallax } from "@/components/ui/Parallax";
import { Pill } from "@/components/ui/Pill";
import { RotatingWord } from "@/components/ui/RotatingWord";
import { SpinningBadge } from "@/components/ui/SpinningBadge";
import { HeroCallFeed } from "./HeroCallFeed";
import styles from "./Hero.module.css";

const VOICE_BARS = [
  { tone: "mint", delay: 0 }, { tone: "mint", delay: 0.15 }, { tone: "mint", delay: 0.3 }, { tone: "mint", delay: 0.45 },
  { tone: "peach", delay: 0.1 }, { tone: "peach", delay: 0.25 }, { tone: "peach", delay: 0.4 },
  { tone: "lilac", delay: 0.05 }, { tone: "lilac", delay: 0.2 }, { tone: "lilac", delay: 0.35 },
  { tone: "mint", delay: 0.5 }, { tone: "mint", delay: 0.12 },
] as const;

/** The first load plays once, in this order. Each number is a stagger step (see seq()). */
const ORDER = { pill: 0, words: 1, lede: 6, actions: 7, checks: 8, panel: 4, feed: 8, badge: 9, call: 10, tag: 11 } as const;

export function Hero() {
  const { hero } = site;
  const words = hero.rotatingWords;
  const headline = `${hero.headlineStart} ${words.slice(0, -1).join(", ")} or ${words[words.length - 1]} ${hero.headlineEnd}`;
  const lead = hero.headlineStart.split(" ");

  const word = (key: string, i: number, content: ReactNode) => (
    <span key={key} className={styles.mask}>
      <span className="anim-word" style={seq(ORDER.words + i)}>
        {content}
      </span>
    </span>
  );

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.copy}>
        <Pill live className="anim-rise" style={seq(ORDER.pill)}>
          {hero.pill}
        </Pill>

        <h1 className={styles.title}>
          <span className="sr-only">{headline}</span>
          <span aria-hidden="true">
            {lead.map((w, i) => (
              <span key={w + i}>
                {word(w + i, i, w)}{" "}
              </span>
            ))}
            {word("rotator", lead.length, <RotatingWord words={words} />)}
            <br />
            {word("end", lead.length + 1, hero.headlineEnd)}
          </span>
        </h1>

        <p className={`anim-rise ${styles.lead}`} style={seq(ORDER.lede)}>{hero.body}</p>

        <div className={`anim-rise ${styles.actions}`} style={seq(ORDER.actions)}>
          <Button href={hero.primaryCta.href} size="lg">
            {hero.primaryCta.label}
          </Button>
          <BookCallButton />
          <Button href={hero.secondaryCta.href} size="lg" variant="secondary">
            {hero.secondaryCta.label}
          </Button>
        </div>

        <CheckList className={`anim-rise ${styles.checks}`} style={seq(ORDER.checks)} items={[...hero.checks]} row />
      </div>

      <div className={styles.visual}>
        <div className={`anim-rise ${styles.panel}`} style={seq(ORDER.panel)} />

        <Parallax className={styles.badgeSlot} distance={-50}>
          <div className="anim-rise" style={seq(ORDER.badge)}>
            <SpinningBadge text={hero.badgeText} size={132} tone="peach" outlined />
          </div>
        </Parallax>

        <Parallax className={styles.feedSlot} distance={-36}>
          <div className="anim-rise" style={seq(ORDER.feed)}>
            <HeroCallFeed />
          </div>
        </Parallax>

        <Parallax className={styles.callSlot} distance={28}>
          <div className="anim-rise" style={seq(ORDER.call)}>
            <div className={`anim-float-alt ${styles.call}`}>
              <div className={styles.callTop}>
                <span className={`anim-ring ${styles.phone}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className={styles.bars} aria-hidden="true">
                  {VOICE_BARS.map((bar, i) => (
                    <span key={i} className={`anim-bar ${styles.bar} ${styles[bar.tone]}`} style={{ animationDelay: `${bar.delay}s` }} />
                  ))}
                </div>
              </div>
              <p className={styles.quote}>{hero.quote}</p>
            </div>
          </div>
        </Parallax>

        <div className={`anim-rise ${styles.tag}`} style={seq(ORDER.tag)}>
          <Pill tone="lilac" mono className="anim-wiggle">
            {hero.exampleTag}
          </Pill>
        </div>
      </div>
    </section>
  );
}
