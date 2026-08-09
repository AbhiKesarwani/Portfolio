import { useEffect, useState } from "react";
import { expectedResumePath, navItems } from "../../data/navigation";
import { MainContainer } from "./MainContainer";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import { GlobalBackground } from "./GlobalBackground";
import { useScrollReveal } from "../../hooks/useScrollReveal";

function getCurrentHash() {
  return navItems.some((item) => item.href === window.location.hash) ? window.location.hash : "#home";
}

export function AppShell() {
  const [activeHref, setActiveHref] = useState("#home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const brandAsset: string | null = null;

  useScrollReveal();

  useEffect(() => {
    setActiveHref(getCurrentHash());

    const onHashChange = () => {
      setActiveHref(getCurrentHash());
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.getAttribute("id");
          if (id) {
            setActiveHref(`#${id}`);
          }
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.2, 0.5, 0.8],
      }
    );

    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
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

      <div className="shell-layout">
        <div className="desktop-sidebar-wrap">
          <Sidebar activeHref={activeHref} resumeHref={resumeHref} brandAsset={brandAsset} />
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

        <MainContainer resumeHref={resumeHref} />
      </div>
    </div>
  );
}
