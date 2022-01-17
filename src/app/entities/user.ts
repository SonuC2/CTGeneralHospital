import { UserRole } from "./user-role";

export class User {
    userId!:number;
    email!:string;
    password!:string;
    userRoleId!:UserRole;
    status!:string;
    dateCreated!:Date;
}
