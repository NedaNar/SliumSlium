import { useEffect, useState } from "react";
import {
  getBadgeBackground,
  getBadgeColor,
  getBadgeTooltip,
} from "../utils/colorUtils";

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
      className="tooltipped"
      data-tooltip={getBadgeTooltip(status)}
      style={{
        backgroundColor: getBadgeBackground(status),
        fontSize: "1rem",
        padding: "0.2rem 0.6rem",
        borderRadius: "4px",
        color: getBadgeColor(status),
        marginLeft: "1rem",
        cursor: "pointer",
      }}
    >
      {isSmallScreen ? "" : "Application"} {status}
    </span>
  );
};
