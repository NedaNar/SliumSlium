export const EXPERIENCE_OPTIONS = [
  { value: "", label: "-" },
  { value: 1, label: "Entry level" },
  { value: 2, label: "Mid level" },
  { value: 3, label: "Senior level" },
];

export const PART_TIME_OPTIONS = [
  { value: "", label: "-" },
  { value: 0, label: "Full time" },
  { value: 1, label: "Part time" },
];

export const WORK_ENVIRONMENT_OPTIONS = [
  { value: "", label: "-" },
  { value: 1, label: "Remote" },
  { value: 2, label: "Hybrid" },
  { value: 3, label: "On-site" },
];

export const getExperience = (experience: number) => {
  switch (experience) {
    case 1:
      return "Entry level";
    case 2:
      return "Mid level";
    case 3:
      return "Senior level";
    default:
      return "-";
  }
};

export const getRemote = (environment: number) => {
  switch (environment) {
    case 1:
      return "Yes";
    case 2:
      return "Hybrid";
    case 3:
      return "No";
    default:
      return "-";
  }
};

export const getPartTime = (partTime: boolean) => {
  return partTime ? "Yes" : "No";
};
