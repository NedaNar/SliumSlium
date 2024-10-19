import { useEffect, useState } from "react";
import { getBadgeBackground, getBadgeColor } from "../utils/colorUtils";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 900);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 900);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <span
      style={{
        backgroundColor: getBadgeBackground(status),
        fontSize: "1rem",
        padding: "0.2rem 0.6rem",
        borderRadius: "4px",
        color: getBadgeColor(status),
        marginLeft: "1rem",
      }}
    >
      {isSmallScreen ? "" : "Application"} {status}
    </span>
  );
};
