import { useEffect, useRef } from "react";
import { setupRibbonMotion } from "@/lib/motion/ribbon";
export function Ribbon() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => setupRibbonMotion(ref.current!), []);
  return (
    <div ref={ref} className="ribbon-shell">
      <div
        className="ribbon"
        aria-label="Live a little. Make it Rame. Feel a lot."
      >
        <div className="ribbon-track" aria-hidden="true">
          <div className="ribbon-group">
            <span className="starburst">✷</span>
            <span>LIVE A LITTLE</span>
            <span className="starburst">✷</span>
            <span>MAKE IT RAME</span>
            <span className="starburst">✷</span>
            <span>FEEL A LOT</span>
          </div>
          <div className="ribbon-group">
            <span className="starburst">✷</span>
            <span>LIVE A LITTLE</span>
            <span className="starburst">✷</span>
            <span>MAKE IT RAME</span>
            <span className="starburst">✷</span>
            <span>FEEL A LOT</span>
          </div>
          <div className="ribbon-group">
            <span className="starburst">✷</span>
            <span>LIVE A LITTLE</span>
            <span className="starburst">✷</span>
            <span>MAKE IT RAME</span>
            <span className="starburst">✷</span>
            <span>FEEL A LOT</span>
          </div>
          <div className="ribbon-group">
            <span className="starburst">✷</span>
            <span>LIVE A LITTLE</span>
            <span className="starburst">✷</span>
            <span>MAKE IT RAME</span>
            <span className="starburst">✷</span>
            <span>FEEL A LOT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
