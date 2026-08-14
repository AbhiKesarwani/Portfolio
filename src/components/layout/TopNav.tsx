import { Download } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { navItems, resumeDownloadName } from "../../data/navigation";
import { PrimaryLinkButton } from "../ui/Button";

type TopNavProps = {
  activeHref: string;
  resumeHref: string | null;
  brandAsset?: string | null;
};

const accentByLabel: Record<string, string> = {
  Home: "emerald",
  About: "cyan",
  Experience: "blue",
  Projects: "violet",
  Research: "amber",
  Skills: "teal",
  Achievements: "gold",
  Contact: "magenta",
};

type PillRect = { left: number; width: number };

function Ripple({ x, y, onDone }: { x: number; y: number; onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 360);
    return () => clearTimeout(timer);
  }, [onDone]);

  return <span className="top-nav-ripple" style={{ left: x, top: y }} aria-hidden="true" />;
}

export function TopNav({ activeHref, resumeHref, brandAsset }: TopNavProps) {
  const avatarSrc = brandAsset ?? "/photo/profile/abhinav-hero.png";
  const [scrolled, setScrolled] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [pillRect, setPillRect] = useState<PillRect | null>(null);
  const [ripples, setRipples] = useState<{ id: number; href: string; x: number; y: number }[]>([]);
  const rippleId = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const updatePill = () => {
      const list = listRef.current;
      if (!list) {
        return;
      }
      const activeEl = list.querySelector<HTMLElement>(`a[href="${activeHref}"]`);
      if (!activeEl) {
        return;
      }
      const listRect = list.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      setPillRect({ left: elRect.left - listRect.left, width: elRect.width });
    };

    updatePill();
    window.addEventListener("resize", updatePill);
    const timer = setTimeout(updatePill, 60);
    return () => {
      window.removeEventListener("resize", updatePill);
      clearTimeout(timer);
    };
  }, [activeHref]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = rippleId.current++;
    setRipples((current) => [
      ...current,
      { id, href, x: event.clientX - rect.left, y: event.clientY - rect.top },
    ]);
  };

  return (
    <header className="top-nav-wrap">
      <div className={scrolled ? "top-nav is-scrolled" : "top-nav"}>
        <a href="#home" className="top-nav-brand" aria-label="Abhinav Kesarwani home">
          <span className="top-nav-brand-avatar-wrap" aria-hidden="true">
            <img src={avatarSrc} alt="Abhinav Kesarwani" className="top-nav-brand-image" />
          </span>
          <span className="top-nav-brand-text">Abhinav Kesarwani</span>
        </a>

        <nav className="top-nav-links" aria-label="Section navigation">
          <ul ref={listRef}>
            {pillRect ? (
              <span
                className="top-nav-active-pill"
                aria-hidden="true"
                style={{ transform: `translateX(${pillRect.left}px)`, width: `${pillRect.width}px` }}
              >
                <span className="top-nav-active-dot" />
              </span>
            ) : null}
            {navItems.map((item) => {
              const isActive = item.href === activeHref;
              const itemRipples = ripples.filter((r) => r.href === item.href);
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={isActive ? "top-nav-link active" : "top-nav-link"}
                    aria-current={isActive ? "page" : undefined}
                    data-accent={accentByLabel[item.label] ?? "emerald"}
                    onClick={(event) => handleNavClick(event, item.href)}
                  >
                    {item.label}
                    {itemRipples.map((r) => (
                      <Ripple
                        key={r.id}
                        x={r.x}
                        y={r.y}
                        onDone={() =>
                          setRipples((current) => current.filter((entry) => entry.id !== r.id))
                        }
                      />
                    ))}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="top-nav-actions">
          <PrimaryLinkButton
            href={resumeHref ?? "/resume/Resume4thYear.pdf"}
            download={resumeDownloadName}
            className="top-nav-resume"
            ariaLabel="Download resume PDF"
          >
            Resume <Download size={15} aria-hidden="true" />
          </PrimaryLinkButton>
        </div>
      </div>
    </header>
  );
}
