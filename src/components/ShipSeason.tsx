import { SHIP_SEASON_VIDEOS } from "@/lib/shipSeason";

export function ShipSeason() {
  const [featured, ...videos] = SHIP_SEASON_VIDEOS;

  return (
    <section id="ship-season" className="mc-section mc-section--ship">
      <div className="mc-section__shell">
        <div className="mc-section__kicker">ship season · latest builds</div>
        <div className="mc-section__header mc-section__header--split">
          <h2>30 apps. 30 days.</h2>
          <p>
            The build log behind the system: long-form videos documenting the
            tools, decisions, experiments, and launches as they happen.
          </p>
        </div>

        <div className="mc-ship-grid">
          <a className="mc-ship-feature" href={featured.href} target="_blank" rel="noreferrer">
            <span className="mc-ship-card__kicker">{featured.kicker}</span>
            <span className="mc-ship-feature__play" aria-hidden>
              ▶
            </span>
            <span className="mc-ship-card__title">{featured.title}</span>
            <span className="mc-ship-card__date">{featured.publishedAt}</span>
          </a>

          <div className="mc-ship-list">
            {videos.map((video) => (
              <a
                className="mc-ship-card"
                href={video.href}
                key={video.id}
                target="_blank"
                rel="noreferrer"
              >
                <span className="mc-ship-card__thumb" aria-hidden />
                <span className="mc-ship-card__body">
                  <span className="mc-ship-card__kicker">{video.kicker}</span>
                  <span className="mc-ship-card__title">{video.title}</span>
                  <span className="mc-ship-card__date">{video.publishedAt}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
