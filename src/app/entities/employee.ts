import { User } from "./user";
import { UserRole } from "./user-role";
export class Employee {
     employeeId !: number;
	 title!:string;
	 firstName!:string;
	 lastName!:string;
	 gender!:string;
     dateOfBirth!:Date;
     dateOfJoining!:Date;
	 email!:string;
	 mobileNO!:string;
	 address!:string;
	 qualification!:string;
	 specialisation!:string;
     status!:string;
     blockStatus!:string;
     userRole!:UserRole;
	 user!:User;
}
