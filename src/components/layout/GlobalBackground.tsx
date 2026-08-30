import { usePageParallax } from "../../hooks/usePageParallax";

export function GlobalBackground() {
  const parallaxRef = usePageParallax<HTMLDivElement>();

  return (
    <div className="global-background" aria-hidden="true" ref={parallaxRef}>
      <div className="bg-gradient" />
      <div className="bg-grid" />
      <div className="bg-particles">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="bg-atmosphere-far">
        <span className="atmo-orb atmo-orb-a" />
        <span className="atmo-orb atmo-orb-b" />
        <span className="atmo-orb atmo-orb-amber" />
        <span className="atmo-cube atmo-cube-a" />
        <span className="atmo-code atmo-code-a">const model = load();</span>
        <span className="atmo-code atmo-code-b">0x4F2A9C</span>
        <span className="bg-scanline" />
      </div>

      <div className="bg-atmosphere-near">
        <span className="atmo-orb atmo-orb-c" />
        <span className="atmo-cube atmo-cube-b" />
        <span className="atmo-cube atmo-cube-c" />
        <span className="atmo-code atmo-code-c">if (learn) infer();</span>
      </div>
    </div>
  );
}
