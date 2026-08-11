import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { navItems, resumeDownloadName } from "../../data/navigation";
import { PrimaryLinkButton } from "../ui/Button";
import { SocialLinks } from "./SocialLinks";

type MobileNavProps = {
  open: boolean;
  activeHref: string;
  resumeHref: string | null;
  onOpen: () => void;
  onClose: () => void;
};

export function MobileNav({ open, activeHref, resumeHref, onOpen, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const onClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", onEscape);
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open, onClose]);

  return (
    <>
      <header className="mobile-header">
        <div className="mobile-brand" aria-label="Abhinav Kesarwani">
          <span className="mobile-brand-logo">AK</span>
        </div>
        <button
          type="button"
          className="icon-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={open ? onClose : onOpen}
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </header>

      <div className={open ? "drawer-overlay open" : "drawer-overlay"} aria-hidden={!open} />

      <aside
        id="mobile-drawer"
        ref={panelRef}
        className={open ? "mobile-drawer open" : "mobile-drawer"}
        aria-label="Mobile navigation drawer"
      >
        <nav aria-label="Mobile section navigation">
          <ul className="nav-list mobile">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === activeHref;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={isActive ? "nav-link active" : "nav-link"}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="nav-indicator" aria-hidden="true" />
                    <Icon size={16} aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mobile-drawer-footer">
          <SocialLinks compact />
          <PrimaryLinkButton
            href={resumeHref ?? "/resume/Resume4thYear.pdf"}
            download={resumeDownloadName}
            ariaLabel="Download resume PDF"
          >
            Resume <Download size={15} aria-hidden="true" />
          </PrimaryLinkButton>
        </div>
      </aside>
    </>
  );
}
