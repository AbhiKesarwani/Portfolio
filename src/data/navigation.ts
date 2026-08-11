import {
  BriefcaseBusiness,
  Code2,
  Cpu,
  FlaskConical,
  House,
  Send,
  Trophy,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: `#${string}`;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home", icon: House },
  { label: "About", href: "#about", icon: UserRound },
  { label: "Experience", href: "#experience", icon: BriefcaseBusiness },
  { label: "Projects", href: "#projects", icon: Code2 },
  { label: "Research", href: "#research", icon: FlaskConical },
  { label: "Skills", href: "#skills", icon: Cpu },
  { label: "Achievements", href: "#achievements", icon: Trophy },
  { label: "Contact", href: "#contact", icon: Send },
];

export type SocialLink = {
  label: "LinkedIn" | "GitHub" | "Email";
  href: string;
};

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abhinav-kesarwani/",
  },
  {
    label: "GitHub",
    href: "https://github.com/AbhiKesarwani/",
  },
  {
    label: "Email",
    href: "mailto:abhinavkesarwani38@gmail.com",
  },
];

export const expectedResumePath = "/resume/Resume4thYear.pdf";
export const resumeDownloadName = "Resume4thYear.pdf";
