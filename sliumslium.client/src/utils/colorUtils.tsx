export const getBadgeBackground = (status: string) => {
  return status === "In Progress"
    ? "#ffc594"
    : status === "Denied"
    ? "#f69697"
    : status === "Accepted"
    ? "#cee38e"
    : "#b2d8d8";
};

export const getBadgeColor = (status: string) => {
  return status === "In Progress"
    ? "#7f400b"
    : status === "Denied"
    ? "#430c08"
    : status === "Accepted"
    ? "#254118"
    : "#004c4c ";
};

export const getBadgeTooltip = (status: string) => {
  return status === "In Progress"
    ? "Hiring manager is considering your application"
    : status === "Denied"
    ? "Sorry to tell, but your application was not successful"
    : status === "Accepted"
    ? "Congratulations! You got the job!"
    : "Your application was not seen by hiring manager yet";
};
