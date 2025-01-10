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
  constructor({
    projectId = 0,
    projectName = '',
    clientName = '',
    startDate = new Date(),
    leadByEmpId = 0,
    contactPerson = '',
    contactNo = '',
    emailId = '',
  }: Partial<IProject>) {
    this.projectId = projectId;
    this.projectName = projectName;
    this.clientName = clientName;
    this.startDate = startDate;
    this.leadByEmpId = leadByEmpId;
    this.contactPerson = contactPerson;
    this.contactNo = contactNo;
    this.emailId = emailId;
  }
}
