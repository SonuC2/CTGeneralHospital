import { User } from "./user";
import { UserRole } from "./user-role";

export class PatientRegistration {
    patientId!:number;
	title!:string;
	firstName!:string;
	lastName!:string;
	email!:string;
	contactNumber!:number;
	dateOfBirth!:Date;
	password!:string;
    status!:string;
	blockStatus!:string;
    createdBy!:number;
    userRole!:UserRole;
    user!:User;
}
