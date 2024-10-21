export interface JobOffer {
  id_JobOffer: number;
  validDate: string;
  name: string;
  description: string;
  salary: number;
  creationDate: string;
  companyName: string;
  location: string;
  workEnvironment: number;
  experienceLevel: number;
  partTime: boolean;
}

export interface JobPart {
  id_Part: number;
  name: string;
  description: string;
  requiresFiles: boolean;
}

export interface UserJobOffer {
  id_UserJobOffer: number;
  status: string;
  applicationDate: string;
  currentPart: number;
  fk_JobOfferid_JobOffer: number;
  fk_Userid_User: number;
}

export interface Applicant {
  id: number;
  name: string;
  email: string;
  date: string;
  status: string;
}

export interface User {
  id_User: number;
  name: string;
  email: string;
  type: 0 | 1;
}
