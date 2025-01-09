import { IEmployee } from './../interfaces';

export class Employee implements IEmployee {
  employeeId: number;
  employeeName: string;
  contactNo: string;
  emailId: string;
  deptId: number;
  password: string;
  gender: string;
  role: string;
  createdDate: Date;

  constructor({
    employeeId = 0,
    employeeName = '',
    contactNo = '',
    emailId = '',
    deptId = 0,
    password = '',
    gender = '',
    role = 'employee',
    createdDate = new Date(),
  }: Partial<IEmployee>) {
    this.employeeId = employeeId;
    this.employeeName = employeeName;
    this.contactNo = contactNo;
    this.emailId = emailId;
    this.deptId = deptId;
    this.password = password;
    this.gender = gender;
    this.role = role;
    this.createdDate = createdDate;
  }
}
