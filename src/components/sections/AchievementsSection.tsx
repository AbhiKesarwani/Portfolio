import { Award, ChevronLeft, ChevronRight, Medal, Trophy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Achievement = {
  title: string;
  detail: string;
};

const achievements: Achievement[] = [
  { title: "2nd Place", detail: "University Hackathon" },
  { title: "2nd Place", detail: "AI Hackathon" },
  { title: "3rd Rank", detail: "HCL GUVI Scholarship" },
  { title: "Workshop Lead", detail: "Conducted Power BI workshop for 40+ Indian Air Force officers" },
];

const carouselAchievements = [...achievements].reverse();

export function AchievementsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const maxLeft = Math.max(0, track.scrollWidth - track.clientWidth);
    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(track.scrollLeft < maxLeft - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      const shouldShiftHorizontally = Math.abs(event.deltaY) > Math.abs(event.deltaX);
      const canShift = track.scrollWidth > track.clientWidth;
      if (shouldShiftHorizontally && canShift) {
        event.preventDefault();
        track.scrollBy({ left: event.deltaY, behavior: "auto" });
      }
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const amount = Math.max(220, Math.round(track.clientWidth * 0.54)) * direction;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="achievements" className="achievements-section" aria-label="Achievements section">
      <div className="section-head reveal-on-scroll">
        <p className="section-kicker">Achievements</p>
        <h2>Recognition</h2>
      </div>

      <div className="achievements-carousel reveal-on-scroll">
        <p className="achievement-cue" aria-hidden="true">
          Scroll to view recognitions
        </p>

        <div className="achievements-carousel-shell">
          <div className="achievement-controls" aria-hidden="true">
            <button
              type="button"
              className="achievement-arrow achievement-arrow-prev"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollPrev}
              tabIndex={-1}
              aria-label="Scroll recognition cards left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="achievement-arrow achievement-arrow-next"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollNext}
              tabIndex={-1}
              aria-label="Scroll recognition cards right"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div
            ref={trackRef}
            className="achievements-grid"
            onScroll={updateScrollState}
            aria-label="Recognition cards"
          >
            {carouselAchievements.map((item, index) => (
              <article key={`${item.title}-${item.detail}`} className="achievement-card card-foundation card-standard reveal-on-scroll">
                <div className="achievement-icon" aria-hidden="true">
                  {index % 3 === 0 ? <Trophy size={16} /> : index % 3 === 1 ? <Medal size={16} /> : <Award size={16} />}
                </div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
