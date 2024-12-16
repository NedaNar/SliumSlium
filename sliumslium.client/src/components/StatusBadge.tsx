import { useEffect, useState } from "react";
import {
  getBadgeBackground,
  getBadgeColor,
  getBadgeTooltip,
} from "../utils/colorUtils";
import "./statusBadge.css";

interface StatusBadgeProps {
  status: string;
  showTooltip?: boolean;
}

export const StatusBadge = ({ status, showTooltip }: StatusBadgeProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 900);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 900);
  };

  useEffect(() => {
    if (showTooltip) {
      const tooltipElements = document.querySelectorAll(".tooltipped");
      M.Tooltip.init(tooltipElements);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <span
      className="tooltipped statusBadge"
      data-tooltip={getBadgeTooltip(status)}
      style={{
        backgroundColor: getBadgeBackground(status),
        color: getBadgeColor(status),
      }}
    >
      {isSmallScreen ? "" : "Application"} {status}
    </span>
  );
};
