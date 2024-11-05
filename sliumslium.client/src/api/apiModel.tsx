export interface JobOffer {
  id_JobOffer?: number;
  validDate: string;
  name: string;
  description: string;
  salary: number;
  creationDate?: string;
  companyName: string;
  location: string;
  workEnvironment: number;
  experienceLevel: number;
  partTime: boolean;
  fk_UserId_User?: number;
  parts?: JobPart[];
}

export interface JobPart {
  id_Part?: number;
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
  currentPart: number;
  userJobOfferId: number;
}

export interface User {
  id_User: number;
  name: string;
  email: string;
  type: 0 | 1;
}

export interface CreateUserJobOfferDTO {
  fk_JobOfferid_JobOffer: number;
  fk_Userid_User: number;
}

export interface FileUploadDTO {
  partId: number;
  userId: number;
  filePath: string;
}

export interface FileUpload {
  id: number;
  filePath: string;
  uploadDate: string;
  partId: number;
  userId: number;
}

export interface ApplicantUpdateDTO {
  status: string;
  currentPart: number;
}
