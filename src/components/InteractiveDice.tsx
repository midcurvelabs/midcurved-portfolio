"use client";

import { useEffect, useRef } from "react";

const FACE_DOTS = {
  one: [5],
  two: [1, 9],
  three: [1, 5, 9],
  four: [1, 3, 7, 9],
  five: [1, 3, 5, 7, 9],
  six: [1, 3, 4, 6, 7, 9],
};

function Dots({ pattern }: { pattern: keyof typeof FACE_DOTS }) {
  return (
    <span className="mc-dice-face__dots" aria-hidden>
      {Array.from({ length: 9 }, (_, index) => {
        const dot = index + 1;
        return (
          <span
            className={FACE_DOTS[pattern].includes(dot) ? "is-active" : ""}
            key={dot}
          />
        );
      })}
    </span>
  );
}

export function InteractiveDice() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let targetX = -17;
    let targetY = -28;
    let currentX = -17;
    let currentY = -28;
    let lastMove = Date.now();

    function tick() {
      const idle = Date.now() - lastMove > 1800;
      const nextTargetX = idle ? -17 : targetX;
      const nextTargetY = idle ? -28 : targetY;
      currentX += (nextTargetX - currentX) * 0.08;
      currentY += (nextTargetY - currentY) * 0.08;
      ref.current?.style.setProperty("--dice-rx", `${currentX}deg`);
      ref.current?.style.setProperty("--dice-ry", `${currentY}deg`);
      frame = requestAnimationFrame(tick);
    }

    function onPointerMove(event: PointerEvent) {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      targetY = -28 + x * 34;
      targetX = -17 + y * -28;
      lastMove = Date.now();
    }

    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="mc-dice-scene" aria-hidden ref={ref}>
      <div className="mc-dice-cube">
        <span className="mc-dice-face mc-dice-face--front">
          <Dots pattern="five" />
        </span>
        <span className="mc-dice-face mc-dice-face--back">
          <Dots pattern="two" />
        </span>
        <span className="mc-dice-face mc-dice-face--right">
          <Dots pattern="six" />
        </span>
        <span className="mc-dice-face mc-dice-face--left">
          <Dots pattern="three" />
        </span>
        <span className="mc-dice-face mc-dice-face--top">
          <Dots pattern="one" />
        </span>
        <span className="mc-dice-face mc-dice-face--bottom">
          <Dots pattern="four" />
        </span>
      </div>
    </div>
  );
}
