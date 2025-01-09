import { IProject } from '../interfaces';

export class Project implements IProject {
  projectId: number;
  projectName: string;
  clientName: string;
  startDate: Date;
  leadByEmpId: number;
  contactPerson: string;
  contactNo: string;
  emailId: string;
  constructor(
    projectId = 0,
    projectName = '',
    clientName = '',
    startDate = new Date(),
    leadBy = 0,
    contactPer = '',
    contactNo = '',
    email = ''
  ) {
    this.projectId = projectId;
    this.projectName = projectName;
    this.clientName = clientName;
    this.startDate = startDate;
    this.leadByEmpId = leadBy;
    this.contactPerson = contactPer;
    this.contactNo = contactNo;
    this.emailId = email;
  }
}
