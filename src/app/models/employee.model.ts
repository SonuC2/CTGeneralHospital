export class EmployeeData {
  constructor(
    public employeeId: number,
    public title: string,
    public firstName: string,
    public lastName: string,
    public gender: string,
    public dateOfBirth: Date,
    public dateOfJoining: Date,
    public email: string,
    public mobileNO: number,
    public address: string,
    public qualification: string,
    public specialisation: string,
    public status: string,
    public userRole: string,
    public block_status: string,
  ) {}
}
