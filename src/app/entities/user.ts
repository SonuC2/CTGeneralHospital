import { UserRole } from "./user-role";

export class User {
    userId!:number;
	email!:string;
	password!:string;
	userRoleId!:UserRole;
	firstLoggedInDate!:Date; 
	status!:string;
}
