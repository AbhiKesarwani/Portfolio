import { useEffect, useState } from "react";
import { expectedResumePath, navItems } from "../../data/navigation";
import { MainContainer } from "./MainContainer";
import { MobileNav } from "./MobileNav";
import { TopNav } from "./TopNav";
import { ContactDock } from "./ContactDock";
import { GlobalBackground } from "./GlobalBackground";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useCursorGlow } from "../../hooks/useCursorGlow";

function getCurrentHash() {
  return navItems.some((item) => item.href === window.location.hash) ? window.location.hash : "#home";
}

export function AppShell() {
  const [activeHref, setActiveHref] = useState("#home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const brandAsset: string | null = null;

  useScrollReveal();
  useCursorGlow();

  useEffect(() => {
    setActiveHref(getCurrentHash());

    const onHashChange = () => {
      setActiveHref(getCurrentHash());
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return;
    }

    // A fixed detection line near the top of the viewport (below the floating
    // nav). The active section is whichever section's top edge is the last
    // one at or above this line. Using bounding rects instead of
    // IntersectionObserver ratios avoids false results for sections much
    // taller than the viewport, whose intersectionRatio can never reach a
    // high threshold even while fully filling the visible area.
    const detectionLine = 140;
    let frame = 0;

    const updateActive = () => {
      frame = 0;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= detectionLine) {
          current = section;
        }
      }
      const id = current.getAttribute("id");
      if (id) {
        setActiveHref(`#${id}`);
      }
    };

    const onScroll = () => {
      if (frame) {
        return;
      }
      frame = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const resumeHref = expectedResumePath;

  return (
    <div className="app-root">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <GlobalBackground />

      <div className="desktop-topnav-wrap">
        <TopNav activeHref={activeHref} resumeHref={resumeHref} brandAsset={brandAsset} />
      </div>

      <div className="mobile-nav-wrap">
        <MobileNav
          open={mobileOpen}
          activeHref={activeHref}
          resumeHref={resumeHref}
          onOpen={() => setMobileOpen(true)}
          onClose={() => setMobileOpen(false)}
        />
      </div>

      <ContactDock />

      <div className="shell-layout">
        <MainContainer resumeHref={resumeHref} />
      </div>
    </div>
  );
}
