export const getBadgeBackground = (jobOffer: string) => {
  return jobOffer === "In Progress"
    ? "#ffc594"
    : jobOffer === "Denied"
    ? "#f69697"
    : jobOffer === "Accepted"
    ? "#cee38e"
    : "#b2d8d8";
};

export const getBadgeColor = (jobOffer: string) => {
  return jobOffer === "In Progress"
    ? "#7f400b"
    : jobOffer === "Denied"
    ? "#430c08"
    : jobOffer === "Accepted"
    ? "#254118"
    : "#004c4c ";
};
