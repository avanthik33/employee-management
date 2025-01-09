export interface IEmployee {
  employeeId: number;
  employeeName: string;
  contactNo: string;
  emailId: string;
  deptId: number;
  password: string;
  gender: string;
  role: string;
  createdDate: Date;
}

export interface IApiResponse {
  message: string;
  result: string;
  data: any;
}

export interface IParentDep {
  departmentId: number;
  departmentName: string;
  departmentLogo: string;
}

export interface IChildDep {
  childDeptId: number;
  parentDeptId: number;
  departmentName: string;
}

export interface IProject {
  projectId: number;
  projectName: string;
  clientName: string;
  startDate: Date;
  leadByEmpId: number;
  contactPerson: string;
  contactNo: string;
  emailId: string;
}
