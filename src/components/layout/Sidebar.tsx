import { Download } from "lucide-react";
import { navItems } from "../../data/navigation";
import { PrimaryLinkButton } from "../ui/Button";
import { SocialLinks } from "./SocialLinks";

type SidebarProps = {
  activeHref: string;
  resumeHref: string | null;
  brandAsset?: string | null;
  onNavigate?: () => void;
};

export function Sidebar({ activeHref, resumeHref, brandAsset, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar-top">
        <div className="brand-block" aria-label="Abhinav Kesarwani brand mark">
          {brandAsset ? (
            <img src={brandAsset} alt="AK logo" className="brand-logo-image" />
          ) : (
            <div className="brand-logo" role="img" aria-label="AK logo fallback">
              AK
            </div>
          )}
          <div className="brand-text">
            <p>ABHINAV</p>
            <p>KESARWANI</p>
          </div>
        </div>

        <nav aria-label="Section navigation">
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === activeHref;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={isActive ? "nav-link active" : "nav-link"}
                    onClick={onNavigate}
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
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-divider" aria-hidden="true" />
        <SocialLinks />
        <PrimaryLinkButton href={resumeHref ?? "/resume/Abhinav4th_year.pdf"} target="_blank" rel="noreferrer" ariaLabel="Open resume">
          Resume <Download size={16} aria-hidden="true" />
        </PrimaryLinkButton>
      </div>
    </aside>
  );
}
